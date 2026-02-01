import { useDropzone } from "react-dropzone";

const ImageDropzone = ({ onFile }: { onFile: (file: File) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFile(acceptedFiles[0] ?? null);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
      transition bg-card
      ${isDragActive ? "border-accent bg-accent/5" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />

      <p className="text-sm text-gray-500">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop image here or click to upload"}
      </p>
    </div>
  );
};

export default ImageDropzone;
