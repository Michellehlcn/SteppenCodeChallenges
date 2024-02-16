/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

const initialItem = [];
export const ItemList = ({ data }) => {
  const [items, setItems] = useState(initialItem);
  const [text, setText] = useState("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [textDeleted, setTextDeleted] = useState("");
  const [textUpdated, setTextUpdated] = useState("");

  /**
   * 
   * @param {*} event Handle text input on change
   */
  const handleChangeInput = (event) => {
    setText(event.target.value)
  }

  /**
   * Handle add new item to the list by pressing enter or click on the button 
   */
  const handleAddOn = () => {
    //Constraint for empty string
    if (text === "") return;
    // If update item
    if (textUpdated) {
      const updatedItems = items.map((i) => {
        if (textUpdated.id === i.id) { return { id: textUpdated.id, text: text } };
        return i;
      });
      setItems(updatedItems);

    } else {
      //if add on item
      try {
        const newItems = [...items, { id: items.length + 1, text: text }];
        setItems(newItems);
      } catch (error) {
        console.log(error)
      }
    }
    setTextUpdated("");
  }
  const handleUpdate = (itm) => {
    setText(itm.text);
    setTextUpdated(itm);
  }
  /**
   * 
   * @param {*} itm will be removed from the list.
   * Handle confirm delete and close the modal 
   */
  const handleRemove = (itm) => {
    const updatedItems = items.filter((i) => {
      return i.id !== itm.id;
    })
    setItems(updatedItems);
    setConfirmModalOpen(false);
  }
  const Modal = ({ closeModal }) => {
    if (closeModal) { return null; }
    return (
      <div className="modal is-active" >
        <div className="modal-background" onClick={() => setConfirmModalOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirmation</p>
            <button className="delete" aria-label="close" onClick={() => setConfirmModalOpen(false)}></button>
          </header>
          <section className="modal-card-body">
            Are you sure to remove this item ?
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={() => handleRemove(textDeleted)}>Delete</button>
            <button className="button" onClick={() => setConfirmModalOpen(false)}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }

  return <>
    <div className="content box">
      <div class="card mt-3 mb-6 ">
        <header class="card-header">
          <p class="card-header-title">
            Text Add-On
          </p>
        </header>
        <div class="card-content">
          <div class="content">
          <input
                className="input"
                type="text"
                onChange={handleChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddOn();
                }}
                value={text}
                placeholder="Please type in ..." />
          </div>
        </div>
        <footer class="card-footer">
          <button href="#" class="card-footer-item button is-warning"  onClick={handleAddOn}>Add</button>
        </footer>
      </div>

      {/* table content */}
      <div className="table-container">
        <div className="ml-2 mr-2">
          <label className="label is-medium">List all items</label>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Number</th>
                <th className="is-half">Content</th>
                <th className="is-one-fifth">  Modify</th>
              </tr>
            </thead>
            <tbody>
              {items.length !== 0 ? items.map((v, idx) => {
                return <>
                  <tr key={idx}>
                    <td>{v.id}</td>
                    <td><blockquote>{v.text}</blockquote></td>
                    <td><div className="card">
                      <footer className="card-footer">
                        <a href="#" className="card-footer-item button is-link"
                          onClick={() => handleUpdate(v)}>Edit</a>
                        <a href="#" className="card-footer-item button is-danger"
                          onClick={() => { setConfirmModalOpen(true); setTextDeleted(v) }} >Delete</a>
                      </footer></div>
                    </td>
                  </tr>

                </>
              }) : <tr><td>...</td><td>...</td><td>...</td></tr>}

            </tbody>
          </table>
        </div>

        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth" onClick={() => setItems([])}>
            Reset all items
          </button>
        </div>
      </div>
    </div>
    {/* Modal content */}
    <Modal closeModal={!isConfirmModalOpen} ></Modal>
  </>
}
