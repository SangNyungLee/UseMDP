export default function DataReader({setState, onRead}){

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        readFileContents(file);
    };

    const readFileContents = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setState(fileContents)
            onRead(false);
        };
        reader.readAsText(file);
    };

    return(
        <>
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
                width: '200px',
                height: '200px',
                border: '2px dashed #ccc',
                backgroundColor: 'white'}}
            >
            Drag and drop a file here
        </div>
        </>
    )
}