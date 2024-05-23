const Temporal = () => {
  return (
    <form action="">
      <div className="flex items-center gap-2">
        <label htmlFor="imageFile">Image file</label>
        <input type="file" accept="image/*" id="imageFile" />
      </div>
    </form>
  );
};

export default Temporal;
