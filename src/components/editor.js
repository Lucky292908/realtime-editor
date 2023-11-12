import Editor from "@monaco-editor/react";
function editor() {
  const code = " ";
  return (
    <Editor
      height="100vh"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={{
        inlineSuggest: true,
        fontSize: "20px",
        formatOnType: true,
        
         
        autoClosingBrackets: true,
        minimap: { scale: 10 }
      }}
    />
  );
}
export default editor;