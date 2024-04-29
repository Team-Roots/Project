import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { OrganizationAdmin } from './OrganizationAdmin';
import { OrganizationWaiver } from './OrganizationWaiver';
import { VoluntreeSubscriptions } from '../voluntreesubscription/VoluntreeSubscriptionCollection';

// export const organizationConditions = ['excellent', 'good', 'fair', 'poor'];
export const organizationPublications = {
  organization: 'Organization',
  organizationAdmin: 'OrganizationAdmin',
};

class OrganizationCollection extends BaseCollection {
  constructor() {
    super('Organization', new SimpleSchema({
      name: {
        type: String,
        defaultValue: 'John Doe Save The Turtles INC',
      },
      missionStatement: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      description: {
        type: String,
        optional: true,
        defaultValue: '',
      },
      website: {
        type: String,
        optional: true,
        defaultValue: 'Change Me!',
      },
      profit: {
        type: Boolean,
        defaultValue: false,
        required: true,
      },
      location: {
        type: String,
        defaultValue: 'Change Me!',
        required: true,
      },
      organizationOwner: {
        type: String,
        defaultValue: 'empty@gmail.com',
        required: true,
        unique: true,
      },
      visible: {
        type: Boolean,
        defaultValue: false,
        required: true,
      },
      onboarded: {
        type: Boolean,
        defaultValue: false,
        required: true,
      },
      orgID: {
        type: SimpleSchema.Integer,
        unique: true,
        required: true,
      },
    }));
  }

  /**
   * Defines a new Org item.
   * @param website the link to the webpage
   * @param profit indication of non-profit or for-profit $$$$$$$$$$$$$$
   * @param organizationOwner the owner of the organization
   * @param visible useful boolean in case organizations want to hide their org page
   * @param onboarded indication of scraped data vs inputted/official data
   * @param location the location of the organization
   * @param backgroundCheck check if org has a background check
   * @param name org name
   * @param missionStatement org's mission statement
   * @return {String} the docID of the new document.
   */
  define({ name, website, profit, location, organizationOwner,
    visible, onboarded, missionStatement, description }) {
    const existingOrg = this._collection.findOne({ organizationOwner: organizationOwner });
    if (existingOrg) {
      throw new Meteor.Error(`Inserting organization ${name} failed because ${organizationOwner} already owns organization ${existingOrg.name}`);
    }
    const existingSubscription = VoluntreeSubscriptions.findOne({ email: organizationOwner }, {});
    if (!existingSubscription) {
      throw new Meteor.Error(`${organizationOwner} does not yet have a Voluntree subscription.`);
    }
    if (!existingSubscription.active) {
      throw new Meteor.Error(`${organizationOwner}'s subscription is not active.`);
    }
    const orgID = this.newGlobalID();
    const docID = this._collection.insert({
      name,
      website,
      profit,
      location,
      organizationOwner,
      visible,
      onboarded,
      orgID,
      missionStatement,
      description,
    });
    const waiverDoc = { waiver: 'test', orgID };
    OrganizationWaiver.define(waiverDoc);
    const orgAdminDoc = { orgAdmin: organizationOwner, orgID };
    OrganizationAdmin.define(orgAdminDoc);
    VoluntreeSubscriptions.update(existingSubscription._id, { orgID });
    return docID;
  }
  // I need to come back to this after I talk to truman
  /**
   * Updates the given document.
   * @param docID the docID of the given organization
   * @param website the link to the webpage
   * @param profit indication of non-profit or for-profit $$$$$$$$$$$$$$
   * @param organizationOwner the owner of the organization
   * @param visible useful boolean in case organizations want to hide their org page
   * @param onboarded indication of scraped data vs inputted/official data
   * @param location the location of the organization
   * @param backgroundCheck check if org has a background check
   */

  update(docID, { name, missionStatement, description, website, profit, location, organizationOwner, visible, onboarded }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (missionStatement) {
      updateData.missionStatement = missionStatement;
    }
    if (description) {
      updateData.description = description;
    }
    if (website) {
      updateData.website = website;
    }
    if (profit) {
      updateData.profit = profit;
    }

    if (location) {
      updateData.location = location;
    }
    if (organizationOwner) {
      updateData.organizationOwner = organizationOwner;
    }

    if (visible) {
      updateData.visible = visible;
    }

    if (onboarded) {
      updateData.onboarded = onboarded;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const toRemoveOrg = this.findDoc(name);
    check(toRemoveOrg, Object);
    OrganizationAdmin.remove({ orgID: toRemoveOrg.orgID }, {});
    this._collection.remove(toRemoveOrg._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(organizationPublications.organization, function publish() {
        if (this.userId && Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN])) {
          const username = Meteor.users.findOne(this.userId).name;
          const orgAdminOrgIDs = _.pluck(OrganizationAdmin.find({ orgAdmin: username }, {}).fetch(), 'orgID'); // orgIDs of all orgs this user is an orgAdmin of
          return instance._collection.find({ $or: [{ visible: true }, { orgID: { $in: orgAdminOrgIDs } }] });
        }
        return instance._collection.find({ visible: true });
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeOrg() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organization);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ name, website, profit, location, organizationOwner, visible, onboarded, orgID, missionStatement, description }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const website = doc.website;
    const profit = doc.profit;
    const location = doc.location;
    const organizationOwner = doc.organizationOwner;
    const visible = doc.visible;
    const onboarded = doc.onboarded;
    const orgID = doc.orgID;
    const missionStatement = doc.missionStatement;
    const description = doc.defaultValue;
    return { name, website, profit, location, organizationOwner, visible, onboarded, orgID, missionStatement, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Organizations = new OrganizationCollection();
