import { useState, useRef, useEffect } from 'react';
import Input from '../components/Input';

// Componente para exibir a imagem com efeito de desfoque
const SimpleInstagramEffect = ({ imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Proporção de tela de celular típica com responsividade
  const mobileRatio = {
    width: '100%',
    maxWidth: '100%',
    aspectRatio: '9/16', // Proporção fixa de um celular (9:16)
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    backgroundColor: '#000'
  };

  return (
    <div style={mobileRatio} className="rounded">
      {isLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src={imageUrl}
            alt="Background blur"
            className="w-100 h-100"
            style={{
              objectFit: 'cover',
              filter: 'blur(15px)',
              opacity: 0.7,
              transform: 'scale(1.1)'
            }}
          />
        </div>
      )}

      <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Imagem carregada"
          onLoad={handleImageLoad}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            zIndex: 10
          }}
        />
      </div>

      {!isLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <span className="text-light">Carregando...</span>
        </div>
      )}
    </div>
  );
};

// Componente de upload que utiliza um botão existente
const ImageUploadWithEffect = ({ children, ...props }) => {

  const { onChange, handleDescription, noDescription } = props
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Limite de 10MB em bytes
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    onChange(previewUrl);
  }, [previewUrl])

  useEffect(() => {
    handleDescription(description);
  }, [description])

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError(''); // Limpa erros anteriores
    
    if (file) {
      // Verifica se é uma imagem
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione apenas arquivos de imagem.');
        return;
      }
      
      // Verifica o tamanho do arquivo
      if (file.size > MAX_FILE_SIZE) {
        setError('O arquivo é muito grande. O tamanho máximo permitido é 10MB.');
        return;
      }
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Input de arquivo escondido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Exibe mensagem de erro se houver */}
      {error && (
        <div className="alert alert-danger mb-2" role="alert">
          {error}
        </div>
      )}

      {/* Renderiza o botão personalizado se não houver imagem ainda */}
      {!previewUrl ? (
        <div onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
          {children}
        </div>
      ) : (
        /* Exibe a visualização dentro do mesmo espaço do botão */
        <div className="mb-2">
          <SimpleInstagramEffect imageUrl={previewUrl} />
          {!noDescription && (
            <Input placeholder="Legenda da foto"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
          )}
          <button
            className="btn btn-sm btn-outline-secondary mt-2 d-block mx-auto"
            onClick={handleButtonClick}
          >
            Trocar imagem
          </button>
        </div>
      )}
    </div>
  );
};

export { SimpleInstagramEffect, ImageUploadWithEffect };



// import { useState, useRef, useEffect } from 'react';
// import Input from '../components/Input';

// // Componente para exibir a imagem com efeito de desfoque
// const SimpleInstagramEffect = ({ imageUrl }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const imageRef = useRef(null);

//   const handleImageLoad = () => {
//     setIsLoaded(true);
//   };

//   // Proporção de tela de celular típica com responsividade
//   const mobileRatio = {
//     width: '100%',
//     maxWidth: '100%',
//     aspectRatio: '9/16', // Proporção fixa de um celular (9:16)
//     position: 'relative',
//     overflow: 'hidden',
//     margin: '0 auto',
//     backgroundColor: '#000'
//   };

//   return (
//     <div style={mobileRatio} className="rounded">
//       {isLoaded && (
//         <div className="position-absolute top-0 start-0 w-100 h-100">
//           <img
//             src={imageUrl}
//             alt="Background blur"
//             className="w-100 h-100"
//             style={{
//               objectFit: 'cover',
//               filter: 'blur(15px)',
//               opacity: 0.7,
//               transform: 'scale(1.1)'
//             }}
//           />
//         </div>
//       )}

//       <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
//         <img
//           ref={imageRef}
//           src={imageUrl}
//           alt="Imagem carregada"
//           onLoad={handleImageLoad}
//           style={{
//             maxHeight: '100%',
//             maxWidth: '100%',
//             objectFit: 'contain',
//             zIndex: 10
//           }}
//         />
//       </div>

//       {!isLoaded && (
//         <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
//           <span className="text-light">Carregando...</span>
//         </div>
//       )}
//     </div>
//   );
// };

// // Componente de upload que utiliza um botão existente
// const ImageUploadWithEffect = ({ children, ...props }) => {

//   const { onChange, handleDescription, noDescription } = props
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [description, setDescription] = useState('');
//   const fileInputRef = useRef(null);


//   useEffect(() => {
//     onChange(previewUrl);

//   }, [previewUrl])

//   useEffect(() => {
//     handleDescription(description);

//   }, [description])



//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const fileReader = new FileReader();
//       fileReader.onload = () => {
//         setPreviewUrl(fileReader.result);
//       };
//       fileReader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       {/* Input de arquivo escondido */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />

//       {/* Renderiza o botão personalizado se não houver imagem ainda */}
//       {!previewUrl ? (
//         <div onClick={handleButtonClick} style={{ cursor: 'pointer' }}>
//           {children}
//         </div>
//       ) : (
//         /* Exibe a visualização dentro do mesmo espaço do botão */
//         <div className="mb-2">
//           <SimpleInstagramEffect imageUrl={previewUrl} />
//           {!noDescription && (

//             <Input placeholder="Legenda da foto"
//               fullWidth
//               value={description}
//               onChange={(e) => setDescription(e.target.value)} />
//           )}
//           <button
//             className="btn btn-sm btn-outline-secondary mt-2 d-block mx-auto"
//             onClick={handleButtonClick}
//           >
//             Trocar imagem
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export { SimpleInstagramEffect, ImageUploadWithEffect };