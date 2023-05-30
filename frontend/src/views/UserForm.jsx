import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    dark_mode: "",
    font_size: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/news");
          window.location.reload();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/news");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <select
              value={user.dark_mode}
              onChange={(ev) =>
                setUser({ ...user, dark_mode: ev.target.value })
              }
              className="select-dark-mode"
              placeholder="Choose your mode"
            >
              <option value="" disabled>
                Choose your mode
              </option>
              <option value="0">Light mode</option>
              <option value="1">Dark mode</option>
            </select>
            <select
              value={user.font_size}
              onChange={(ev) =>
                setUser({ ...user, font_size: ev.target.value })
              }
              className="select-font-size"
              placeholder="Choose your font size"
            >
              <option value="" disabled>
                Choose your font size
              </option>
              <option value="0">Normal</option>
              <option value="1">Small</option>
              <option value="2">Big</option>
            </select>
            <input
              type="password"
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(ev) =>
                setUser({ ...user, password_confirmation: ev.target.value })
              }
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
