import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

const createProfile = (firstName, lastName, owner, idNumber) => {
  console.log(`  Creating profile ${firstName}.`);
  Profiles.collection.insert(
    {
      firstName,
      lastName,
      owner,
      idNumber,
    },
    (error) => {
      if (error) {
        console.log('Error', error.message, 'error');
      } else {
        console.log('Success', 'Profile added successfully', 'success');
      }
    },
  );
};

// When running app for first time, pass a settings file to set up a default user account.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default Profiles');
    Meteor.settings.defaultProfiles.forEach(({ firstName, lastName, owner, idNumber }) => createProfile(firstName, lastName, owner, idNumber));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
