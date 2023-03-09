import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Avatar/Avatar";
import FbModal from "../../FbModal/FbModal";
import Cropper from "react-easy-crop";
import "./Info.css";
import getCroppedImg from "../../../Pages/utility/Croper";
import { userProfilePhotoUpdater } from "../../../redux/auth/authAction";

const Info = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);
      setImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  
  const { user } = useSelector((state) => state.auth);
  const [profilePhotoUpdate, setProfilePhotoUpdate] = useState(false);

  // profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setImage(img);
  };

  // handle cancel crop image
  const handleCancelCrop = () => {
    setImage();
    setZoom(1);
  };

  // handle profile photo update

  const handleProfilePhotoUpadte = async () => {
    try {

      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      const testPhoto = await fetch(croppedImage).then((res) => res.blob());

      const finalPhoto = new File([testPhoto], "profile_photo.png", {
        type: "image/png",
      });

      const form_data = new FormData();
      form_data.append("profile", finalPhoto);

      let id = user._id
      dispatch(userProfilePhotoUpdater(id,
        form_data,
        setProfilePhotoUpdate,
        setImage
      ))
  
      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      {profilePhotoUpdate && (
        <FbModal title="Update profile photo" closeBtn={setProfilePhotoUpdate}>
          {!image && (
            <div className="profile__upload">
              <label htmlFor="myfile">
                <input
                  type="file"
                  id="myfile"
                  style={{ display: "none" }}
                  onChange={handleProfilePhotoUpload}
                />
                <i class="bx bx-plus"></i>Upload photo
              </label>
            </div>
          )}

          {image && (
            <>
              <div className="profile__photo__manage">
                <div className="profile__croping">
                  <textarea placeholder="Description"></textarea>
                </div>
                <div className="profile__croping__area">
                  <Cropper
                    image={image}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="round"
                    cropSize={{ width: 300, height: 300 }}
                    showGrid={false}
                  />
                </div>
                <div className="image__zooming">
                  <button>
                    <i class="bx bx-minus" />
                  </button>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={5}
                    step={0.01}
                    onChange={(e) => setZoom(e.target.value)}
                  />
                  <button>
                    <i class="bx bx-plus" />
                  </button>
                </div>
                <div className="profile__croping__btns">
                  <button onClick={showCroppedImage}>
                    <i class="bx bx-crop"></i>Crop Photo
                  </button>
                  <button>
                    <i class="bx bxs-time-five"></i>Make temporary
                  </button>
                </div>
              </div>
              <div className="profile__modal__save__area">
                <button onClick={handleCancelCrop}>Cancel</button>
                <button
                  className="save-blue"
                  onClick={handleProfilePhotoUpadte}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </FbModal>
      )}
      <div className="fb-profile-details">
        <div className="profile-info">
          <div className="profile-photo">
            <Avatar />
            <button
              className="profile-camera-btn"
              onClick={() => setProfilePhotoUpdate(true)}
            >
              <i class="bx bxs-camera"></i>
            </button>
          </div>

          <div className="profile-desc">
            <h1>
              {`${user.first_name} ${user.sur_name}`} <span>({user.sur_name})</span>
            </h1>
            <div className="profile-follow-details">
              <span className="profile-followers">15k follower</span>
              <span className="profile-following">1k following</span>
            </div>
            <div className="profile-friends-list">
              <ul>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-action">
          <button>
            <span className="follow-icon"></span> <span>Follow</span>
          </button>
          <button>
            <span className="message-icon"></span> <span>Message</span>
          </button>
          <button className="blue">
            <span className="add-friend-icon"></span> <span>Add friend</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Info;
