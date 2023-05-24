import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Sighnin = () => {
  const [status, setStatus] = useState();
  const [a, setA] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirst_name] = useState();
  const [old, setOld] = useState();
  const [education_degree, setEducation_degree] = useState(1);
  const [mobile, setMobile] = useState();
  const [skills, setSkills] = useState();
  const [experiences, setEperiences] = useState();
  const [educationz, setEducationz] = useState();
  const [languages, setLanguages] = useState();
  const [about, setAbout] = useState();
  const [name_en, setName_en] = useState();
  const [name_fa, setName_fa] = useState();
  const [website, setWebsite] = useState();
  const [establishment, setEstablishment] = useState();
  const [count_type, setCount_type] = useState(1);
  const [address, setAddress] = useState();
  const [topping, setTopping] = useState("1");

  const [last_name, setLast_name] = useState();
  const [national_code, setNational_code] = useState();
  const [sex, setSex] = useState();
  localStorage.setItem("access", a);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8001/api/share/auth/register/",
        {
          old: old,
          education_degree: education_degree,
          mobile: mobile,
          skills: skills,
          experiences: experiences,
          educationz: educationz,
          languages: languages,
          about: about,
          typ: topping,
          name_en: name_en,
          name_fa: name_fa,
          website: website,
          establishment: establishment,
          count_type: count_type,
          address: address,
          password: password,
          username: userName,
          first_name: first_name,
          last_name: last_name,
          national_code: national_code,
          sex: sex,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((result) => {
        setStatus(result.status.toString());
        setA(result.data.access.toString());
        window.location.href = "/";
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };
  const location = useLocation();

  const onOptionChange = (e) => {
    setSex(e.target.value);
  };

  const onTypeChange = (e) => {
    setTopping(e.target.value);
  };
  useEffect(() => {}, [status]);
  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.setItem("flag", "false");
    }
  }, [location.pathname]);

  return (
    <div className="row  ">
      <div className="col-6 !mt-20 !ml-24">
        <div className="card">
          <div className="card-body bg-light ">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div>
                  <label htmlFor="input">type</label>
                  <div className="ml-3 mt-1">
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="topping"
                        value="1"
                        id="1"
                        checked={topping === "1"}
                        onChange={onTypeChange}
                      />
                      employeer<label class="form-check-label" htmlFor="1"></label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="topping"
                        value="2"
                        id="2"
                        checked={topping === "2"}
                        onChange={onTypeChange}
                      />
                      <label class="form-check-label" htmlFor="2">
                      employee
                      </label>
                    </div>
                  </div>
                </div>
                <div > 
                  <label htmlFor="username">Username</label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                  />
                </div>
                <div hidden={topping !== "2"}>
                <label htmlFor="username">Name_en</label>
                <input
                  onChange={(e) => setName_en(e.target.value)}
                  type="text"
                  name="Name_en"
                  className="form-control"
                  id="Name_en"
                  />
                  </div>
                  <div hidden={topping !== "2"}>

                <label htmlFor="username">Website</label>
                <input
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  name="Website"
                  className="form-control"
                  id="Website"
                  />
                  </div>
                  <div hidden={topping !== "2"}>
                <label htmlFor="username">Establishment</label>
                    
                <input
                  onChange={(e) => setEstablishment(e.target.value)}
                  type="text"
                  name="Establishment"
                  className="form-control"
                  id="Establishment"
                  />
                  </div>
              <div hidden={topping !== "2"}>

                <label htmlFor="username">Name_fa</label>
                <input
                  onChange={(e) => setName_fa(e.target.value)}
                  type="text"
                  name="Name_fa"
                  className="form-control"
                  id="Name_fa"
                  />
                  </div>
                <div hidden={topping !== "1"}>
                  <label htmlFor="username">Old</label>
                  <input
                    onChange={(e) => setOld(e.target.value)}
                    type="number"
                    name="old"
                    className="form-control"
                    id="old"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  name="password"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">firstname</label>
                <input
                  onChange={(e) => setFirst_name(e.target.value)}
                  type="text"
                  name="firstname"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">lastname</label>
                <input
                  onChange={(e) => setLast_name(e.target.value)}
                  type="text"
                  name="lastname"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">national_code</label>
                <input
                  onChange={(e) => setNational_code(e.target.value)}
                  type="number"
                  name="national_code"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">Mobile</label>
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  type="number"
                  name="setMobile"
                  className="form-control"
                  id="setMobile"
                />
              </div>

              <div className="form-group" hidden={topping !== "2"}>
                <label htmlFor="password">address</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="number"
                  name="national_code"
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">Educationz</label>
                <input
                  onChange={(e) => setEducationz(e.target.value)}
                  type="text"
                  name="Educationz"
                  className="form-control"
                  id="Educationz"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">Languages</label>
                <input
                  onChange={(e) => setLanguages(e.target.value)}
                  type="text"
                  name="Languages"
                  className="form-control"
                  id="Languages"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">Eperiences</label>
                <input
                  onChange={(e) => setEperiences(e.target.value)}
                  type="number"
                  name="Eperiences"
                  className="form-control"
                  id="Eperiences"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">About</label>
                <input
                  onChange={(e) => setAbout(e.target.value)}
                  type="text"
                  name="About"
                  className="form-control"
                  id="About"
                />
              </div>
              <div className="form-group" hidden={topping !== "1"}>
                <label htmlFor="password">skills</label>
                <input
                  onChange={(e) => setSkills(e.target.value)}
                  type="text"
                  name="skills"
                  className="form-control"
                  id="skills"
                />
              </div>
              <div hidden={topping !== "1"}>
                <label htmlFor="amount">education_degree</label>
                <select
                  value={education_degree}
                  onChange={(e) => setEducation_degree(Number(e.target.value))}
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                >
                  <option value="1">Associate</option>
                  <option value="2">Bachelor</option>
                  <option value="3">Master</option>
                  <option value="4">Doctoral</option>
                </select>
              </div>
              <div hidden={topping !== "2"}>

              <label htmlFor="amount">Count_type</label>
              <select
                value={education_degree}
                onChange={(e) => setCount_type(Number(e.target.value))}
                className="form-select form-select-lg"
                aria-label=".form-select-lg example"
                >
                <option value="1">VERY_SMALL</option>
                <option value="2">SMALL</option>
                <option value="3">MEDIUM</option>
                <option value="4">LARGE</option>
                <option value="5">VERY_LARGE</option>
              </select>
                </div>
              <div hidden={topping !== "1"}>
                <label htmlFor="input" className="mt-2">
                  sex
                </label>
                <div className="ml-3 mt-0.5">
                  <div class="form-check mt-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sex"
                      value="1"
                      id="Male"
                      checked={sex === "1"}
                      onChange={onOptionChange}
                    />
                    <label class="form-check-label" htmlFor="input">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sex"
                      value="2"
                      id="Famale"
                      checked={sex === "2"}
                      onChange={onOptionChange}
                    />
                    <label class="form-check-label" htmlFor="Famale">
                      Famale
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn mt-2 btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sighnin;
