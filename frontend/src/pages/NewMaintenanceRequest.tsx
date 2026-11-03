import { useState, type SubmitEvent } from "react";
import "../styles/NewMaintenanceRequest.css";

function NewMaintenanceRequest() {
  // Form field state management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [buildingAddress, setBuildingAddress] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");

  
const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();

  const maintenanceRequest = {
    title,
    description,
    category,
    buildingAddress,
    apartmentNumber,
  };

  console.log(maintenanceRequest);
};

const handleCancel = () => {
  setTitle("");
  setDescription("");
  setCategory("");
  setBuildingAddress("");
  setApartmentNumber("");
};

  return (
    <div className="maintenance-page">
      <div className="maintenance-content">
        <h1>Tee uusi huoltopyyntö</h1>

        <p className="maintenance-intro">
          Ilmoita uusi asuntoosi liittyvä huoltotarve
        </p>

        <form
          onSubmit={handleSubmit}
          onReset={handleCancel}
          className="maintenance-form"
        >
          <div className="form-group">
            <label htmlFor="title">Otsikko *</label>
            <input
              id="title"
              type="text"
              placeholder="esim. Keittiön hana vuotaa"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Kuvaus *</label>
            <textarea
              id="description"
              placeholder="Kuvaile huoltotarvetta mahdollisimman tarkasti..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          
<div className="form-group">
  <label htmlFor="buildingAddress">Rakennuksen osoite *</label>
  <input
    id="buildingAddress"
    type="text"
    placeholder="Esim. Esimerkkikatu 10"
    value={buildingAddress}
    onChange={(event) => setBuildingAddress(event.target.value)}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="apartmentNumber">Asunnon numero *</label>
  <input
    id="apartmentNumber"
    type="text"
    placeholder="Esim. A 12"
    value={apartmentNumber}
    onChange={(event) => setApartmentNumber(event.target.value)}
    required
  />
</div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Kategoria *</label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="">Valitse kategoria</option>
                <option value="electricity">Sähkö</option>
                <option value="water">Vesi ja viemäri</option>
                <option value="heating">Lämmitys</option>
                <option value="doors_locks">Ovet ja lukot</option>
                <option value="other">Muu</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="reset" className="cancel-button">
              Peruuta
            </button>

            <button type="submit" className="submit-button">
              Lähetä huoltopyyntö
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMaintenanceRequest;
