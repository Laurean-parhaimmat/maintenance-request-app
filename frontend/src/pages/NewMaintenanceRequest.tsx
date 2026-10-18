import { useState, type FormEvent } from "react";
import "../NewMaintenanceRequest.css";

function NewMaintenanceRequest() {
  // Lomakkeen kenttien tilanhallinta
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maintenanceRequest = {
      title,
      description,
      location,
      category,
      urgency,
      image,
    };

    console.log(maintenanceRequest);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setCategory("");
    setUrgency("");
    setImage(null);
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
            <label htmlFor="location">Sijainti (vapaaehtoinen)</label>
            <input
              id="location"
              type="text"
              placeholder="esim. Keittiö, kylpyhuone..."
              value={location}
              onChange={(event) => setLocation(event.target.value)}
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
                <option value="water">Vesi ja viemäri</option>
                <option value="electricity">Sähkö</option>
                <option value="heating">Lämmitys</option>
                <option value="apartment">Asunto</option>
                <option value="other">Muu</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Kiireellisyys *</label>
              <select
                id="urgency"
                value={urgency}
                onChange={(event) => setUrgency(event.target.value)}
                required
              >
                <option value="">Valitse kiireellisyys</option>
                <option value="low">Matala</option>
                <option value="medium">Normaali</option>
                <option value="high">Kiireellinen</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Lisää kuva (vapaaehtoinen)</label>
            <input
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
            />
            {image && <p>Valittu kuva: {image.name}</p>}
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
