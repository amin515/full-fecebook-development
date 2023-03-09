import React, { useCallback, useState } from "react";
import FbModal from "../../FbModal/FbModal";
import Cropper from "react-easy-crop";
import './Cover.css';
import getCroppedImg from "../../../Pages/utility/Croper";
import { useDispatch, useSelector } from "react-redux";
import { userProfileCoverPhotoUpdater } from "../../../redux/auth/authAction";

const Cover = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [coverPhoto, setCoverPhoto] = useState(false);
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
      setZoom(1)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);


  // cover photo get image url

  const handleCoverPhotoUpload = (e) => {

    const img = URL.createObjectURL(e.target.files[0]);
    setImage(img);
  };
  // finaly upload cover photo
  const handleUploadCoverPhoto = async() => {

    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      const blobPhotoCover = await fetch(croppedImage).then(res => res.blob())

      const finalCoverPhoto = new File([blobPhotoCover], "cover_photo.png", {
        type : "image/png"
      })
  
      const data_form = new FormData()
      data_form.append('cover', finalCoverPhoto);
  
      let id = user._id
      console.log(id)
      dispatch(userProfileCoverPhotoUpdater(id,
        data_form,
        setCoverPhoto,
        setImage
        ))
      
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <>
      <div className="fb-header-shad"></div>
      <div className="fb-cover-photo">
        <img
          src={`/cover/${user.cover_photo}`}
          alt=""
        />
        <button className="edit-btn" onClick={() => setCoverPhoto(true)}>
          <span className="camera-icon"></span> Edit cover photo
        </button>
        <div className="cover-photo-area">
        {coverPhoto && (
          <FbModal title="Edit cover photo" closeBtn={setCoverPhoto}>
            {!image && (
              <div className="cover__upload">
                <label htmlFor="myfile">
                  <input
                    type="file"
                    id="myfile"
                    style={{ display: "none" }}
                    onChange={handleCoverPhotoUpload}
                  />
                  <i class="bx bx-plus"></i>Upload cover photo
                </label>
              </div>
            )}

            {image && (
              <>
                <div className="cover__photo__manage">
                  <div className="cover__croping__area">
                    <Cropper
                    image={image}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={4 / 4}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropSize={{width:500, height: 500}}
                    showGrid={false}
                  />
                  </div>
                  <div className="image__zooming">
                    <button className="plus-minus">
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
                    <button   className='plus-minus'>
                      <i class="bx bx-plus" />
                    </button>
                  </div>
                  <div className="cover__croping__btns">
                    <button onClick={showCroppedImage}>
                      <i class="bx bx-crop"></i>Crop Photo
                    </button>
                    <button>
                      <i class="bx bxs-time-five"></i>Make temporary
                    </button>
                  </div>
                </div>
                <div className="cover__modal__save__area">
                  <button onClick={() => setImage()}>Cancel</button>
                  <button className="save-blue" onClick={handleUploadCoverPhoto}>
                    Save
                  </button>
                </div>
              </>
            )}
          </FbModal>
        )}
        </div>
       
      </div>
    </>
  );
};

export default Cover;
