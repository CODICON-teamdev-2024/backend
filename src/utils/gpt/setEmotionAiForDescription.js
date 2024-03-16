const promptAssistJsonEmotions = `
  me devolverás 3 datos siempre en estilo json :
  {
    emocion: "".
    color: "en hexadecimal"
    emoji: ""
  }
  yo te voy a decir como me siento y tu me devuelves los 3 datos.
  recuerda, un json
  `

export async function setEmocionAiForDescription(description) {


  try {

    const promptClient = description
    const response = await useGPT(promptAssistJsonEmotions, promptClient)

    const data = JSON.parse(response)
    console.log(`data`, data)

    return data
  } catch (error) {
    //como tenemos un error, mandamos un objeto por defecto
    return {
      "emocion": "neutral",
      "color": "#000000",
      "emoji": "😐"
    }
  }

}
async function useGPT(promptAssist, promptClient) {
  try {

    const params = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { "role": "system", "content": promptAssist },
        { "role": "user", "content": promptClient },
      ],
      "max_tokens": 60
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    throw error
  }
}

// probamos la función de manera local y asincrona
// (async () => {
//   console.log(await setEmocionAiForDescription("I'm feeling happy"));
// })();