export default function useRead(setState){

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        readFileContents(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    const readFileContents = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setState(fileContents)
        };
        reader.readAsText(file);
    };

    const readerRegister = {
        onDrop: handleDrop,
        onDragOver: handleDragOver,
    }

    return readerRegister
}