import openai

openai.api_key = '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'

def generate_image(prompt):
    response = openai.Image.create(
        model="text-davinci-003",
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    return response.data[0].url

prompt = "A serene landscape with mountains in the background and a clear lake in the foreground"
imageUrl = generate_image(prompt)
print(imageUrl)
