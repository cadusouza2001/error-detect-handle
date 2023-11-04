import React, { useState } from 'react';
import { huffmanDecompression } from '../../decoder/huffman';

const DecodingComponent: React.FC = () => {
  const [compressedText, setCompressedText] = useState<string>(
    '101111110101100000101001101100111',
  );
  const [decompressedText, setDecompressedText] = useState<string>('');
  const [huffmanCodes, setHuffmanCode] = useState<{
    [key: string]: string;
  }>({});

  const handleDecompression = () => {
    setDecompressedText(huffmanDecompression(compressedText, huffmanCodes));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Pega o primeiro arquivo selecionado (pode adicionar validações adicionais)

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string; // Conteúdo do arquivo como uma string
        setCompressedText(fileContent);
      };

      reader.readAsText(file); // Lê o arquivo como texto
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Compressor de Texto - Decodificação</h1>
      <div className='input-container'>
        <label htmlFor='compressedTextArea'>Texto Comprimido:</label>
        <textarea
          id='compressedTextArea'
          className='text-area'
          value={compressedText}
          onChange={(event) => setCompressedText(event.target.value)}
        />
        <input
          type='file'
          className='file-input'
          accept='.txt'
          onChange={handleFileUpload}
        />
      </div>

      <div className='input-container'>
        <label htmlFor='customHuffmanCodes'>Códigos Huffman (JSON):</label>
        <textarea
          id='customHuffmanCodes'
          className='text-area'
          onBlur={(event) => {
            try {
              setHuffmanCode(JSON.parse(event.target.value || '{}'));
            } catch (error) {
              console.error(
                'Erro ao analisar o JSON de códigos Huffman:',
                error,
              );
            }
          }}
          placeholder='Insira os códigos Huffman em formato JSON'
        />
      </div>

      <button className='confirm-button' onClick={() => handleDecompression()}>
        Descomprimir
      </button>
      <div className='compressed-text-container'>
        <h2>Texto Descomprimido:</h2>
        <p>{decompressedText}</p>
      </div>
    </div>
  );
};

export default DecodingComponent;
