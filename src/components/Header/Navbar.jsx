import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuth, handleDelete } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow" style={{ background: "#0d6efd" }} >
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          NB Store
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"  >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Products </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/order">Orders </Link>
            </li>

          </ul>

          {!isAuth ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/auth/login" > Login </Link>

              <Link className="btn btn-warning" to="/auth/register" >Register </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/dashboard" >Dashboard </Link>

              <button className="btn btn-danger" onClick={handleDelete} > Logout  </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;