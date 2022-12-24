import React from 'react'
import CreatePost from '../CreatePost/CreatePost'
import StoryBox from '../StoryBox/StoryBox'
import UserPost from '../UserPost/UserPost'

const TimeLine = () => {
    
  return (
    <>
    
    <div className="fb-home-timeline">
          
          <div className="story-box">
            <div className="story-box-header">
              <ul>
                <li>
                  <a href="#">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      width="1em"
                      height="1em"
                      className="x1lliihq x1k90msu x2h7rmj x1qfuztq x1qq9wsj x1qx5ct2 xw4jnvo"
                    >
                      <g fill-rule="evenodd" transform="translate(-446 -350)">
                        <path
                          d="M457 368.832a.5.5 0 0 0 .883.323l1.12-1.332a.876.876 0 0 1 .679-.323h3.522a2.793 2.793 0 0 0 2.796-2.784v-10.931a2.793 2.793 0 0 0-2.796-2.785h-3.454a2.75 2.75 0 0 0-2.75 2.75v15.082zm-1.5 0a.5.5 0 0 1-.883.323l-1.12-1.332a.876.876 0 0 0-.679-.323h-3.522a2.793 2.793 0 0 1-2.796-2.784v-10.931a2.793 2.793 0 0 1 2.796-2.785h3.454a2.75 2.75 0 0 1 2.75 2.75v15.082z"
                        />
                      </g>
                    </svg>
                    <span>Stories</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      width="1em"
                      height="1em"
                      className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"
                    >
                      <g fill-rule="evenodd" transform="translate(-446 -350)">
                        <path
                          d="M454.59 355h4.18l-2.4-4h-3.28c-.22 0-.423.008-.624.017L454.59 355zm6.514 0h3.695c-.226-1.031-.65-1.79-1.326-2.489-1.061-1.025-2.248-1.488-4.392-1.511h-.379l2.401 4zm-8.78 0-1.942-3.64c-.73.247-1.315.63-1.868 1.165-.668.69-1.09 1.445-1.315 2.475h5.125zm7.043 7.989a.711.711 0 0 1-.22.202l-4.573 2.671-.05.027a.713.713 0 0 1-1.024-.643v-5.343l.002-.056a.714.714 0 0 1 1.072-.56l4.572 2.67.054.036a.714.714 0 0 1 .167.996zm-12.366-5.99V363.083l.001.03v.112l.005.048h.001c.05 2.02.513 3.176 1.506 4.203 1.102 1.066 2.324 1.525 4.577 1.525h5.99c2.144-.023 3.331-.486 4.392-1.511 1.005-1.04 1.467-2.198 1.517-4.217h.003c.003-.1.005-.1.006-.204l.001-.156V357h-18z"
                        />
                      </g>
                    </svg>
                    <span>Reels</span>
                  </a>
                </li>
              </ul>
            </div>
            <StoryBox />
          </div>
          <CreatePost />
          <UserPost/>
        </div>
    </>
  )
}

export default TimeLine