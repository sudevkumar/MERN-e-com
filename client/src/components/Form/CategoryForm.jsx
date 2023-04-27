import React from "react";

function CategoryForm({ value, setValue, addCategory }) {
  return (
    <>
      <form onSubmit={addCategory}>
        <div class="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter A New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "70%" }}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
