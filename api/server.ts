import * as WebSocket from "ws";

interface HuffmanMessage {
  encodedText: string;
  codeMap: { [key: string]: string };
}

function huffmanDecompression(
  encodedText: string,
  codeMap: { [key: string]: string }
): string {
  let decodedText = "";
  let currentCode = "";

  for (const bit of encodedText) {
    currentCode += bit;
    if (Object.values(codeMap).includes(currentCode)) {
      const foundKey = Object.keys(codeMap).find(
        (key) => codeMap[key] === currentCode
      );
      decodedText += foundKey;
      currentCode = "";
    }
  }

  return decodedText;
}

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    const huffmanMessage: HuffmanMessage = JSON.parse(message);
    const decodedText = huffmanDecompression(
      huffmanMessage.encodedText,
      huffmanMessage.codeMap
    );
    console.log(`Received message => ${decodedText}`);
  });

  ws.send("Hello! Message from server!!");
});

console.log("Server started...");
