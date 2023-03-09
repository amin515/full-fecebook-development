import React from "react";
import FBCard from "../../FBCard/FBCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  featuredPhotoUpdater,
  saveInfoModal,
  userUpdateProfile,
} from "../../../redux/auth/authAction";
import FbModal from "../../FbModal/FbModal";
import ClickUpdate from "../../ClickUpdate/ClickUpdate";
import PopupFullWidth from "../../PopupFullWidth/PopupFullWidth";
import StorySlider from "../../StorySlider/StorySlider";
import featuredImage from "../../../assets/images/previewUpload.png";
import axios from "axios";


const ProfileIntro = () => {
  // use dispatch
  const dispatch = useDispatch();
  // get data from redux
  const { user } = useSelector((state) => state.auth);

  // set state for bio button hide or show
  const [bioShow, setBioShow] = useState(false);

  // remaining set state
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [remain, setRemain] = useState(101 - bio.length);

  // change save button disable or enable
  const [saveBtn, setSaveBtn] = useState(true);
  // show [popup modal] or hide
  const [showPopup, setShowPopup] = useState(false);

  // function for hide bio or show
  const handleBioShow = (e) => {
    e.preventDefault();
    setBioShow(!bioShow);
  };

  // remaining character changes function

  const handleChangeBio = (e) => {
    setBio(e.target.value);
    setRemain(101 - e.target.value.length);
    setSaveBtn(false);

    if (remain < 0) {
      setSaveBtn(true);
    } else if (remain > 0) {
      setSaveBtn(false);
    }
  };

  // handle bio update
  const handleBioUpdate = (e) => {
    e.preventDefault();
    dispatch(userUpdateProfile({ bio }, user._id, setBioShow));
  };

  // show category on popup modal
  const [catShow, setCatShow] = useState(false);
  const [cat, setCat] = useState(user.category ? user.category : "");

  const handleCatShow = (e) => {
    e.preventDefault();
    setCatShow(!catShow);
  };

  const handleUpdateCat = (e) => {
    e.preventDefault();

    dispatch(userUpdateProfile({ category: cat }, user._id, setCatShow));
  };

  // show work on popup modal
  const [jobShow, setJobShow] = useState(false);
  // const [job, setJob] = useState(user.work ? user.work : [])
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  // update work function
  const handleWorkShow = (e) => {
    e.preventDefault();
    setJobShow(!jobShow);
  };

  const handleUpdateWork = (e) => {
    e.preventDefault();

    dispatch(
      userUpdateProfile(
        { work: [...user.work, { position, company }] },
        user._id,
        setJobShow
      )
    );
  };

  // handle delete work position
  const handleDelWork = (company) => {
    const finalWork = user.work.filter((data) => data.company !== company);
    dispatch(userUpdateProfile({ work: finalWork }, user._id, setJobShow));
  };

  // set education function and state

  const [education, setEducation] = useState(false);
  const [versiti, setVersity] = useState(false);
  const [school, setSchool] = useState("");
  const [university, setUniversiti] = useState("");

  // handle show edu modal
  const handleShowEdu = (e) => {
    e.preventDefault();
    setEducation(!education);
  };

  const handleShowVer = (e) => {
    e.preventDefault();
    setVersity(!versiti);
  };

  // handle update versity
  const handleUpdateVersiti = (e) => {
    e.preventDefault();
    dispatch(
      userUpdateProfile(
        { collage_versity: [...user.collage_versity, { university }] },
        user._id,
        setVersity
      )
    );
  };

  // update primary school
  const handleUpdatePrimary = (e) => {
    e.preventDefault();

    dispatch(
      userUpdateProfile(
        { primary: [...user.primary, { school }] },
        user._id,
        setEducation
      )
    );
  };

  // delete school

  const handleDelSchool = (school) => {
    const updateSchool = user.primary.filter((data) => data.school !== school);
    dispatch(
      userUpdateProfile({ primary: updateSchool }, user._id, setEducation)
    );
  };
  const handleDelVersity = (university) => {
    const updateVersiti = user.collage_versity.filter(
      (data) => data.university !== university
    );
    dispatch(
      userUpdateProfile(
        { collage_versity: updateVersiti },
        user._id,
        setEducation
      )
    );
  };

  // set home or living funtion state

  const [addLiving, setAddLiving] = useState(false);
  const [living, setLiving] = useState(user.living ? user.living : "");

  const handleShowLiv = (e) => {
    e.preventDefault();
    setAddLiving(!addLiving);
  };
  // update living
  const handleUpdateLiving = (e) => {
    e.preventDefault();
    dispatch(userUpdateProfile({ living }, user._id, setAddLiving));
  };

  // set home town function
  const [home, setHome] = useState(false);
  const [hometown, setHomeTown] = useState(user.hometown ? user.hometown : "");

  const handleShowTown = (e) => {
    e.preventDefault();
    setHome(!home);
  };

  const handleUpdateHomeTown = (e) => {
    e.preventDefault();
    dispatch(userUpdateProfile({ hometown }, user._id, setHome));
  };

  // set relationship function state
  const [rship, setRship] = useState(false);
  const [relationship, setRelationship] = useState(
    user.relationship ? user.relationship : ""
  );

  const setRelaShow = (e) => {
    e.preventDefault();
    setRship(!rship);
  };

  const updateRelation = (e) => {
    e.preventDefault();
    dispatch(userUpdateProfile({ relationship }, user._id, setRship));
  };

  // set featured function state
  const [featuredShow, setFeaturedShow] = useState(false);

  //switcher

  const [enableProfile, setEnableProfile] = useState(false);
  const handleSaveModal = (data) => {
    setShowPopup(false);
    dispatch(saveInfoModal(data), setEnableProfile);
  };

  // featured modal

  const [featuredAdd, setFeaturedAdd] = useState(false);
  const [featuredUploadShow, setFeaturedUploadShow] = useState(false);

  const [preview, setPreview] = useState([]);
  const [featuredChecked, setFeaturedChecked] = useState([]);



  const handleBackPrevious = () => {
    setFeaturedAdd(true);
    setFeaturedUploadShow(false);
    setPreview([]);
  };


  // check uncheck photo 
  const handleFeaturedUploadPhotos = (e) => {
    setPreview((prevState) => ([...prevState, ...Array.from(e.target.files)]))
    setFeaturedChecked((prevState) => ([...prevState, ...Array.from(e.target.files)]))
  };
  
  const handleFuturePreviewChange = (e) => {
   const updatedList = [...featuredChecked]

   const val = preview.find((data) => data.name === e.target.value)

   if(featuredChecked.includes(val)){
    updatedList.splice(updatedList.indexOf(val), 1)
   }else{
    updatedList.push(val)
   }
   setFeaturedChecked(updatedList)
  
  }
  
  // get value from form data
  const [sliderInput, setSliderInput] = useState('')

  const handleFeturedNameInputValue = (e) => {
    setSliderInput(e.target.value)
  }

  //slider featured
  const handleFeaturedSlider = () => {
    const data = new FormData()
    data.append("name", sliderInput)
  
    featuredChecked.forEach(item => {
      data.append("slider",  item)
      
    })

    let id = user._id
    dispatch(featuredPhotoUpdater(id, data,  setSliderInput, setFeaturedUploadShow,setFeaturedAdd))

  }

  let featured = user.featured[1].slider

  return (
    <FBCard>
      <div className="user-personal-info">
        <h3>Intro</h3>
        <div className="bio">
          {user.bio && !bioShow && (
            <>
              <p>{user.bio}</p>
              <a className="personal-info-button" onClick={handleBioShow}>
                Edit bio
              </a>
            </>
          )}

          {!user.bio && !bioShow && (
            <>
              <a className="personal-info-button" onClick={handleBioShow}>
                Add bio
              </a>
            </>
          )}
        </div>

        {bioShow && (
          <div className="quick-change">
            <textarea
              name=""
              placeholder="Describe who you are"
              onChange={handleChangeBio}
            >
              {user.bio}
            </textarea>
            <p>{remain} Character remaining</p>
            <div className="quick-change-content">
              <div
                style={{
                  backgroundImage: `url('https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png')`,
                }}
                className="bio-status"
              >
                <span>Public</span>
              </div>
              <div className="bio-btn">
                <button onClick={handleBioShow}>Cancel</button>
                <button
                  className={`${!saveBtn && "active-save-btn"}`}
                  disabled={saveBtn}
                  onClick={handleBioUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="personal-info-details">
          <ul>
            {/* Category */}
            {enableProfile && (
              <li>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png"
                  alt=""
                />
                <span>
                  Profile -{" "}
                  <strong>
                    {" "}
                    <span className="bio-editor">
                      {user.category ? user.category : ""}
                    </span>
                  </strong>
                </span>
              </li>
            )}

            {/* work */}

            {user.work.map((data, index) => (
              <li key={index}>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                  alt=""
                />
                <span>
                  {data.position} of -{" "}
                  <strong>
                    {" "}
                    <span className="bio-editor">{data.company}</span>
                  </strong>
                </span>
              </li>
            ))}

            {/* education */}

            {user.primary.map((data, index) => (
              <li key={index}>
                {/* <div className="graduate-profile-img" style={{backgroundImage : 'url("https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/18aHIhr9RAE.png")'}}></div> */}
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/vGSgEwj4UxE.png"
                  alt=""
                />
                <span>
                  Study at -{" "}
                  <strong>
                    {" "}
                    <span className="bio-editor">{data.school}</span>
                  </strong>
                </span>
              </li>
            ))}
            {user.collage_versity.map((data, index) => (
              <li key={index}>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/vGSgEwj4UxE.png"
                  alt=""
                />
                <span>
                  Graduate at -{" "}
                  <strong>
                    {" "}
                    <span className="bio-editor">{data.university}</span>
                  </strong>
                </span>
              </li>
            ))}

            {/* Lives */}

            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png"
                alt=""
              />
              <span>
                Lives in -{" "}
                <strong>
                  {" "}
                  <span className="bio-editor">
                    {user.living ? user.living : ""}
                  </span>
                </strong>
              </span>
            </li>

            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png"
                alt=""
              />
              <span>
                From -{" "}
                <strong>
                  {" "}
                  <span className="bio-editor">
                    {user.hometown ? user.hometown : ""}
                  </span>
                </strong>
              </span>
            </li>

            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeFzJYivslVFpW9uL-fqmoNBrlG3yvH4CWGuUbfK8fgJYR7A7i2SO35IxndpZwoBYduuR_4QtpwzF53EDpJK3T8N"
                alt=""
              />
              <span>
                <strong>
                  {" "}
                  <span className="bio-editor">{user.relationship}</span>
                </strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Fb Modal popup */}

        {showPopup && (
          <FbModal title="Edit-detailes" closeBtn={setShowPopup}>
            <div className="profile-intro">
              <div className="customize-intro">
                <div className="customize-intro-section">
                  <h4>Customize your Intro</h4>
                  <p>Detailes you select will be public</p>
                </div>
              </div>
              <div className="customize-detailes">
                <div className="customize-detailes-sec">
                  {/* category */}
                  <div className="working-sec">
                    <h4>Category</h4>

                    {!catShow && !user.category && (
                      <div className="working-edit">
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                          alt=""
                        />
                        <a href="#" onClick={handleCatShow}>
                          Add a category
                        </a>
                      </div>
                    )}

                    {user.category && !catShow && (
                      <div className="profile-intro-data">
                        <div className="profile-intro-data-wrapper">
                          <img
                            onClick={() => setEnableProfile(true)}
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png"
                            alt=""
                          />
                          <span>{user.category}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={handleCatShow}
                        >
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png"
                            alt=""
                          />
                        </div>
                      </div>
                    )}

                    {catShow && (
                      <ClickUpdate
                        placeholder=""
                        hide={setCatShow}
                        data={{
                          data: cat,
                          setData: setCat,
                          placeholder: "Set your profile category",
                        }}
                        save={handleUpdateCat}
                      />
                    )}
                  </div>

                  {/* working */}

                  <div className="working-sec">
                    <h4>Working</h4>

                    {user.work.map((data, index) => (
                      <div className="profile-intro-data" key={index}>
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                            alt=""
                          />
                          <span>{data.position}</span> of{" "}
                          <strong>{data.company}</strong>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={() => handleDelWork(data.company)}
                        >
                          <div
                            className="del-btn-profile-intro-work"
                            style={{
                              backgroundImage:
                                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/18aHIhr9RAE.png")',
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    {!jobShow && user.work !== [] && (
                      <div className="working-edit">
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                          alt=""
                        />
                        <a href="#" onClick={handleWorkShow}>
                          Add a worksplace
                        </a>
                      </div>
                    )}
                  </div>

                  {jobShow && (
                    <ClickUpdate
                      hide={setJobShow}
                      data={{
                        data: position,
                        setData: setPosition,
                        placeholder: "Set your position",
                      }}
                      data2={{
                        data: company,
                        setData: setCompany,
                        placeholder: "Set your company name",
                      }}
                      save={handleUpdateWork}
                    />
                  )}

                  {/* Education */}
                  <div className="working-sec">
                    <h4>Education</h4>

                    {user.primary.map((data, index) => (
                      <div className="profile-intro-data" key={index}>
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                            alt=""
                          />
                          <span>{data.school}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={() => handleDelSchool(data.school)}
                        >
                          <div
                            className="del-btn-profile-intro-work"
                            style={{
                              backgroundImage:
                                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/18aHIhr9RAE.png")',
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    <div className="working-edit">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                        alt=""
                      />
                      <a href="#" onClick={handleShowEdu}>
                        Add a secondary school
                      </a>
                    </div>

                    {education && (
                      <ClickUpdate
                        hide={setEducation}
                        data={{
                          data: school,
                          setData: setSchool,
                          placeholder: "Add Primary School",
                        }}
                        save={handleUpdatePrimary}
                      />
                    )}

                    {user.collage_versity.map((data, index) => (
                      <div className="profile-intro-data" key={index}>
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                            alt=""
                          />
                          <span>{data.university}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={() => handleDelVersity(data.university)}
                        >
                          <div
                            className="del-btn-profile-intro-work"
                            style={{
                              backgroundImage:
                                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/18aHIhr9RAE.png")',
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    <div className="working-edit">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                        alt=""
                      />
                      <a href="#" onClick={handleShowVer}>
                        Add a university
                      </a>
                    </div>
                  </div>

                  {versiti && (
                    <ClickUpdate
                      hide={setVersity}
                      data={{
                        data: university,
                        setData: setUniversiti,
                        placeholder: "Add universiti or collage",
                      }}
                      save={handleUpdateVersiti}
                    />
                  )}

                  {/* current city */}
                  <div className="working-sec">
                    <h4>Current city</h4>
                    {!addLiving && (
                      <div className="working-edit">
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                          alt=""
                        />
                        <a href="#" onClick={handleShowLiv}>
                          Add a current city
                        </a>
                      </div>
                    )}

                    {user.living && !addLiving && (
                      <div className="profile-intro-data">
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png"
                            alt=""
                          />
                          <span>{user.living}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={handleShowLiv}
                        >
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png"
                            alt=""
                          />
                        </div>
                      </div>
                    )}

                    {addLiving && (
                      <ClickUpdate
                        hide={setAddLiving}
                        data={{
                          data: living,
                          setData: setLiving,
                          placeholder: "Add your current city",
                        }}
                        save={handleUpdateLiving}
                      />
                    )}
                  </div>

                  {/* HomeTown */}
                  <div className="working-sec">
                    <h4>Home town</h4>
                    {!home && (
                      <div className="working-edit">
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                          alt=""
                        />
                        <a href="#" onClick={handleShowTown}>
                          Add a home town
                        </a>
                      </div>
                    )}

                    {user.hometown && !home && (
                      <div className="profile-intro-data">
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png"
                            alt=""
                          />
                          <span>{user.hometown}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={handleShowTown}
                        >
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png"
                            alt=""
                          />
                        </div>
                      </div>
                    )}

                    {home && (
                      <ClickUpdate
                        hide={setHome}
                        data={{
                          data: hometown,
                          setData: setHomeTown,
                          placeholder: "Add your home town",
                        }}
                        save={handleUpdateHomeTown}
                      />
                    )}
                  </div>

                  {/* Relationship */}
                  <div className="working-sec">
                    <h4>Relationship</h4>
                    {!rship && (
                      <div className="working-edit">
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                          alt=""
                        />
                        <a href="#" onClick={setRelaShow}>
                          Add a relationship
                        </a>
                      </div>
                    )}

                    {user.relationship && !rship && (
                      <div className="profile-intro-data">
                        <div className="profile-intro-data-wrapper">
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeFzJYivslVFpW9uL-fqmoNBrlG3yvH4CWGuUbfK8fgJYR7A7i2SO35IxndpZwoBYduuR_4QtpwzF53EDpJK3T8N"
                            alt=""
                          />
                          <span>{user.relationship}</span>
                        </div>
                        <div
                          className="profile-intro-data-wrappper-edit"
                          onClick={setRelaShow}
                        >
                          <img
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/OR6SzrfoMFg.png"
                            alt=""
                          />
                        </div>
                      </div>
                    )}

                    {rship && (
                      <ClickUpdate
                        hide={setRship}
                        data={{
                          data: relationship,
                          setData: setRelationship,
                          placeholder: "Add your relationship status",
                        }}
                        save={updateRelation}
                      />
                    )}
                  </div>

                  {/* joined */}
                  <div className="working-sec">
                    <h4>Joined facebook</h4>
                    <div className="working-edit">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                        alt=""
                      />
                      <a href="#">joined facebook</a>
                    </div>
                  </div>

                  {/* following */}
                  <div className="working-sec">
                    <h4>Following</h4>
                    <div className="working-edit">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png"
                        alt=""
                      />
                      <a href="#">Add a follower</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-modal-footer">
                <div className="footer-modal-wraper">
                  <div className="footer-modal-content">
                    <span className="save-info">
                      <a href="#">Save your info</a>
                    </span>
                  </div>
                  <div className="footer-modal-btn">
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                    <button onClick={handleSaveModal}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </FbModal>
        )}

        <a
          href="#"
          className="personal-info-button"
          onClick={() => setShowPopup(!showPopup)}
        >
          Edit details
        </a>
      </div>
      <div className="hobbies">
        <div className="hobbie-list">
          <div className="hobbie-list-item">
            <img
              src="https://i.ibb.co/XFxYx23/earth.png"
              alt="earth"
              border="0"
            />
            <p>Travelling</p>
          </div>
          <div className="hobbie-list-item">
            <img
              src="https://i.ibb.co/XFxYx23/earth.png"
              alt="earth"
              border="0"
            />
            <p>Travelling</p>
          </div>
          <div className="hobbie-list-item">
            <img
              src="https://i.ibb.co/XFxYx23/earth.png"
              alt="earth"
              border="0"
            />
            <p>Travelling</p>
          </div>
          <div className="hobbie-list-item">
            <img
              src="https://i.ibb.co/XFxYx23/earth.png"
              alt="earth"
              border="0"
            />
            <p>Travelling</p>
          </div>
          <button>See All</button>
        </div>
        <a className="personal-info-button">Edit hobies</a>
      </div>
      <div className="personal-features">
        <div className="profile-featured-content">
          <div
            className="profile-features-gallary"
            onClick={() => setFeaturedShow(true)}
          >
            <div className="profile-features-item">
              <div
                style={{
                  backgroundImage: 
                  `url(/slider/${featured[0]})`,
                }}
                className="profile-featured-image"
              ></div>
            </div>
            <span className="featured-item-count">{`+ ${featured.length - 1}`}</span>
          </div>
          <div
            className="profile-features-gallary"
            onClick={() => setFeaturedShow(true)}
          >
            <div className="profile-features-item">
              <div
                style={{
                  backgroundImage:
                    'url("https://dvvy6louqcr7j.cloudfront.net/vista/HO00013564/heroPoster/Avatar-The-Way-of-Water.png")',
                }}
                className="profile-featured-image"
              ></div>
            </div>
            <span className="featured-item-count">+33</span>
          </div>
          <div
            className="profile-features-gallary"
            onClick={() => setFeaturedShow(true)}
          >
            <div className="profile-features-item">
              <div
                style={{
                  backgroundImage:
                    'url("https://dvvy6louqcr7j.cloudfront.net/vista/HO00013564/heroPoster/Avatar-The-Way-of-Water.png")',
                }}
                className="profile-featured-image"
              ></div>
            </div>
            <span className="featured-item-count">+33</span>
          </div>
        </div>

        {featuredShow && (
          <PopupFullWidth hide={setFeaturedShow}>
            <StorySlider hide={setFeaturedShow} />
          </PopupFullWidth>
        )}

        <div className="add-featured-modal">
          {/* modal 1 */}
          {featuredAdd && !featuredUploadShow && (
            <FbModal title="Edit featured" closeBtn={setFeaturedAdd}>
              <div className="featured-popup-modal">
                <div className="featured-popup-modal-wrapper">
                  <img src={featuredImage} alt="" />
                </div>
                <p>
                  Feature your favourite photos and stories here for all of your
                  friends to see.
                </p>
                <a href="#" onClick={() => setFeaturedUploadShow(true)}>
                  Add New
                </a>
              </div>
            </FbModal>
          )}

          {/* modal 2 */}
          {featuredUploadShow && (
            <FbModal title="Edit featured collection" back={handleBackPrevious}>

              <input type="text" placeholder="Featured Name" name="slider" className="featuredInput" value={sliderInput} onChange={handleFeturedNameInputValue}/>
              <div
                className="featured-popup-modal"
                style={{ minHeight: "500px" }}
              >
                <label htmlFor="featuredUpload">
                  Upload Photos
                  <input
                    style={{ display: "none" }}
                    onChange={handleFeaturedUploadPhotos}
                    type="file"
                    multiple={true}
                    id="featuredUpload"
                  />
                </label>

                <div className="upload-featured-sample-photo">
                  {preview.map((item, index) => {

                    const prevURL = URL.createObjectURL(item)
                    return(
                      <>
                      <div className="featured-sample-photo" key={index}>
                        <label
                          htmlFor={`checkbox-${index}`}
                          className="wrap-label"
                        >
                          <img src={prevURL} alt="" />
                        </label>
                        <div className="container">
                          <div className="round-label">
                            <div className="round">
                              <input 
                              type="checkbox"
                              id={`checkbox-${index}`} 
                              value={item.name} 
                              checked={featuredChecked.includes(item)}
                              onChange={handleFuturePreviewChange}
                              />
                              <label htmlFor={`checkbox-${index}`}></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    )
                    
                  })}
                </div>
              </div>
              <div className="featured-next-cancel-btn">
                <button onClick={handleBackPrevious}>Cancel</button>
                <button className="active"
                disabled={featuredChecked.length === 0} onClick={handleFeaturedSlider}>Next</button>
              </div>
            </FbModal>
          )}
        </div>

        <a
          onClick={() => setFeaturedAdd(true)}
          className="personal-info-button"
        >
          Edit features
        </a>
      </div>
    </FBCard>
  );
};

export default ProfileIntro;
