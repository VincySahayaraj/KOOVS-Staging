import React from "react";
import './topbrands.css';
import { Link } from "react-router-dom";

class TopBrands extends React.Component {
    render() {
        return (

            <section className="top_brands pb-5">
                <div className="container-fluid">
                    <div className="col-12 d-flex justify-content-between py-4">
                        <div className="">Top Brands</div>
                        <div><a><u>View All</u></a></div>
                    </div>
                </div>
                <div className="container">
                    <div className="top-brand-content py-0 py-lg-5" style={{ cursor: "pointer" }}>
                        <Link to="/brand" style={{ color: "white", textDecoration: "none" }}> 361 Degree,</Link>      <Link to="/" style={{ color: "white", textDecoration: "none" }}> AMON, </Link>
                        <Link to="/brand" style={{ color: "white", textDecoration: "none" }}> ATTIC SALT,</Link>   Blue Saint, Bollywoo, DIWAAH, Freakins, Good Stuff, KOOVS, LC Waikiki, New Look, Oxolloxo, ONE / ZERO BY KOOVS, Peak.
                    </div>
                </div>
            </section>

        )
    }
}

export default TopBrands;


