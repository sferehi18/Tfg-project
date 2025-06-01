
function NoContentPage({title, message}) {
  return (
    <div className="d-flex flex-column  justify-content-center h-100">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <h2 className="text-lg text-gray-600">{message}</h2>
    </div>
  );
}   

export default NoContentPage;