
import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar/Avatar'

const StoryBox = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <>
      <div className="story-box-body">
              <div className="story-area">
                <div
                  className="story-item auth-user-story"
                  // style="background-image: url(`${user}`)"
                >
                  <div className="auth-story-create">
                    <button>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        width="1em"
                        height="1em"
                        className="x1lliihq x1k90msu x2h7rmj x1qfuztq x14ctfv x1qx5ct2 xw4jnvo"
                      >
                        <g fill-rule="evenodd" transform="translate(-446 -350)">
                          <g fill-rule="nonzero">
                            <path
                              d="M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z"
                              transform="translate(354.5 159.5)"
                            ></path>
                            <path
                              d="M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z"
                              transform="translate(354.5 159.5)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <p>Create Story</p>
                  </div>
                </div>

                <div
                  className="story-item"
                  
                >
                  <div className="story-user">
                    <Avatar />
                  </div>
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </div>

                <div
                  className="story-item"
                  
                >
                  <div className="story-user">
                  <Avatar />
                  </div>
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </div>

                <div
                  className="story-item"
                  
                >
                  <div className="story-user">
                  <Avatar />
                  </div>
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </div>

                <div
                  className="story-item"
                  
                >
                  <div className="story-user">
                  <Avatar />
                  </div>
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </div>

              </div>
            </div>
    </>
  )
}

export default StoryBox
