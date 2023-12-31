import React, { useState, useEffect, ChangeEvent } from 'react';
import { huffmanCompression } from '../../encoder/huffman';
import FileSaver from 'file-saver';
import { crcEncode } from '../../handlers/crc';
import { repetitionEncode } from '../../handlers/repetition';
import { stringToBits } from '../../utils/stringToBits';
import { hammingEncode } from '../../handlers/hamming';

const EncodingComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('carlossouza');
  const [compressedText, setCompressedText] = useState<string>('');
  const [huffmanCodes, setHuffmanCode] = useState<{
    [char: string]: string;
  }>();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleCompression = () => {
    const result = huffmanCompression(inputText);
    setCompressedText(result.encodedText);
    setHuffmanCode(result.code);

    // Convert the Huffman message to bits
    const huffmanMessageBits = stringToBits(
      JSON.stringify({
        encodedText: result.encodedText,
        codeMap: result.code,
      }),
    );

    // Compute and send the CRC code
    const crcCode = 'CRC:' + crcEncode(huffmanMessageBits);

    // Compute and send the repetition code
    const repetitionCode = 'REP:' + repetitionEncode(huffmanMessageBits, 3);

    // Compute and send Hamming code
    const hammingCode = 'HAM:' + hammingEncode(huffmanMessageBits);

    // Create a WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:8080');

    // Wait for the connection to be open before sending the message
    ws.onopen = () => {
      ws.send(crcCode);
      ws.send(repetitionCode);
      ws.send(hammingCode);
    };
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Pega o primeiro arquivo selecionado (pode adicionar validações adicionais)

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result; // Conteúdo do arquivo como uma string
        if (typeof fileContent === 'string') {
          setInputText(fileContent);
        }
      };

      reader.readAsText(file); // Lê o arquivo como texto
    }
  };

  const handleDownload = () => {
    const blob = new Blob([compressedText], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(blob, 'compressed_text.txt');
  };

  useEffect(() => {
    handleCompression();
  }, []);

  return (
    <div className='container'>
      <h1 className='title'>Compressor de Texto - Codificação</h1>
      <div className='input-container'>
        <label htmlFor='textArea'>Insira o texto:</label>
        <textarea
          id='textArea'
          value={inputText}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <input
        className='file-input'
        type='file'
        accept='.txt'
        onChange={handleFileUpload}
      />

      <button className='confirm-button' onClick={() => handleCompression()}>
        Comprimir
      </button>

      <div className='compressed-text-container'>
        <h2>Texto Comprimido:</h2>
        <p>{compressedText}</p>
      </div>

      <div className='huffman-codes-container'>
        <h2>Codewords Huffman:</h2>
        <p>{JSON.stringify(huffmanCodes)}</p>
      </div>

      <button className='download-button' onClick={handleDownload}>
        Baixar Arquivo
      </button>
    </div>
  );
};

export default EncodingComponent;
