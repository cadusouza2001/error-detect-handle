import * as WebSocket from "ws";
import { huffmanDecompression } from "./decoder/huffman";
import { crcDecode } from "./handlers/crc";
import { repetitionDecode } from "./handlers/repetition";
import { bitsToString } from "./utils/bitsToString";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: Buffer) => {
    try {
      const messageString = message.toString("utf-8");
      let decodedText;

      // Check if the message is a CRC code
      if (messageString.startsWith("CRC:")) {
        decodedText = crcDecode(messageString.slice(4));
      } else if (messageString.startsWith("REP:")) {
        decodedText = repetitionDecode(messageString.slice(4), 3);
      } else {
        return;
      }

      // Convert the bits back to a Huffman message
      const huffmanMessage = JSON.parse(bitsToString(decodedText));

      // Decode the Huffman message
      const decodedHuffmanText = huffmanDecompression(
        huffmanMessage.encodedText,
        huffmanMessage.codeMap
      );

      console.log(`Received message => ${decodedHuffmanText}`);
    } catch (error) {
      console.error(`Error handling message: ${error}`);
    }
  });

  ws.send("Hello! Message from server!!");
});

console.log("Server started...");
