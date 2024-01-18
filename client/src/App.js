import "./App.css";
import vectorPic from "./Vector.png";
import Star from "./Star.jpg";
import placing from "./resort.jpg";
import search from "./search.jpg";
import group from "./group.jpg";
import location from "./location_circle.jpg";
import cal from "./calendar.jpg";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
function App() {
  const [place, setPlace] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [result, setResult] = useState();
  const [hotels, setHotels] = useState([]);
  const [alldata, setdata] = useState();
  let info = new Array();
  // let hotels = new Array();
  useEffect(() => {
    console.log(hotels);

    // console.log(info);
  }, [result]);
  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    console.log(JSON.stringify(startDate).substring(1, 11));
    setStart(JSON.stringify(startDate).substring(1, 11));
    setEndDate(endDate);
    console.log(JSON.stringify(endDate).substring(1, 11));
    setEnd(JSON.stringify(endDate).substring(1, 11));
  };
  function compareByPrice(a, b) {
    return a.PricesInfo.AmountAfterTax - b.PricesInfo.AmountAfterTax;
  }
  const clicked = async (e) => {
    e.preventDefault();
    let id = -1;
    if (place === "Val Thorens") {
      id = 1;
    } else if (place === "Courchevel") {
      id = 2;
    } else if (place === "Tignes") {
      id = 3;
    } else if (place === "La Plagne") {
      id = 4;
    } else if (place === "Chamonix") {
      id = 5;
    } else {
      id = 1;
    }
    let amountOfPeople = 1;
    if (amount) {
      amountOfPeople = parseInt(amount, 10);
    }
    console.log(amountOfPeople);
    const data = await fetch("http://localhost:3001/getSearches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placeid: id,
        from_date: start,
        to_date: end,
        group_size: amountOfPeople,
      }),
    }).then((res) => res.json());
    console.log(data);
    setdata(data);
    console.log(alldata);
    let results = data.body.accommodations;
    console.log(results);
    results.sort(compareByPrice);
    console.log(results);
    console.log(results[0]);
    setHotels(results);
    info = results;
    console.log(hotels);
    setResult(result + 1);
  };

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <div className="App">
      <div className="top">
        <div className="conp">
          <img className="picture" src={vectorPic}></img>
        </div>
        <div className="cont">
          <div className="form">
            <img id="na" src={placing}></img>
            <select
              className="place"
              onChange={handleChangePlace}
              value={place}
              aria-placeholder="place"
            >
              <option value="Val Thorens">Val Thorens</option>
              <option value="Courchevel">Courchevel</option>
              <option value="Tignes">Tignes</option>
              <option value="La Plagne">La Plagne</option>
              <option value="Chamonix">Chamonix</option>
            </select>
          </div>

          <div className="form">
            <img id="ne" src={group}></img>

            <select
              className="place"
              onChange={handleChangeAmount}
              value={amount}
              aria-placeholder="amount"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="form">
            <img id="ng" src={cal}></img>
            <DatePicker
              selected={startDate}
              onChange={handleChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
            />
          </div>
          <button className="btn" onClick={clicked}>
            <img src={search}></img>
            search
          </button>
        </div>
      </div>
      <div className="select">
        <h1>Select your ski trip</h1>
      </div>
      <div className="popup">
        {hotels.length > 0 ? (
          // <p>Hotels for you</p>
          hotels.map((todo) => (
            <div className="hotel" key={todo.HotelCode}>
              <img
                src={todo.HotelDescriptiveContent.Images[0].URL}
                alt={todo.HotelDescriptiveContent.Images[0].URL}
              ></img>

              <div className="hotel info">
                <h3>
                  Latitude: {todo.HotelInfo.Position.Latitude}, Longitude:{" "}
                  {todo.HotelInfo.Position.Longitude}{" "}
                  <img id="nr" src={location}></img>, {todo.HotelInfo.Rating}
                  <img className="star" id="ni" src={Star}></img>/5
                  <img className="star" id="no" src={Star}></img>,{" "}
                  {todo.HotelInfo.Beds} beds
                </h3>
              </div>
              <div className="prices">
                {todo.PricesInfo.AmountAfterTax}$/per person
              </div>
            </div>
          ))
        ) : (
          <p>No hotels for your search</p>
        )}
      </div>
    </div>
  );
}

export default App;
