import toast from "react-hot-toast";

// Crea un mensaje y actualiza el respectivo documento de conversation 
// al que pertenece
const requestNewMessage = async (values:{conversation:string, author:string, content:string, messages: []}) => {
    const {conversation, author, content} = values;
    
    try {
      const responseMessages = await fetch(process.env.BACKEND_URL + "/mensajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({conversation:conversation, author:author, content:content}),
      });

      const message = await responseMessages.json();
      console.log(message);
      return message
  
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un problema al enviar el mensaje");
    }
  };

export { requestNewMessage };
