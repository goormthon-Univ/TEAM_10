import css from './Mainmydata.module.css'
import userImage from "../images/userImage.png";
import underLine from '../images/mydataUnderLine.svg'
import { useEffect, useState } from 'react';
import RandomImage from "../component/RandomPerson";

const Mainmydata = () => {

    const authToken = localStorage.getItem("key");

    const [profile, setProfile] = useState([
        {
            "userId": 2,
            "userEmail": "goormoa2",
            "userName": "구르모아2",
            "followDetailListDTO": {
                "profileId": 2,
                "profileImg": "수정용이미지2"
            }
        }
    ]);
    const url = "http://3.34.190.41/profile/";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const [followings, setFollowings] = useState([
        {
            "userId": 1,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 1,
                "profileImg": null
            }
        },
        {
            "userId": 3,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 3,
                "profileImg": null
            }
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.34.190.41/follow/following', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type' : 'application/json',
                    }, 
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFollowings(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const [followers, setFollowers] = useState([
        {
            "userId": 1,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 1,
                "profileImg": null
            }
        },
        {
            "userId": 3,
            "userName": "김정목",
            "profileFollowListDTO": {
                "profileId": 3,
                "profileImg": null
            }
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.34.190.41/follow/followers', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFollowers(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const [recommend, setRecommend] = useState([
        {
            "userId": 3,
            "userEmail": "slsdfkls",
            "userName": "왈왈1",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "vnlxklsl",
            "userName": "왈왈2",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "eieie",
            "userName": "왈왈3",
            "profileImg": null
        },
        {
            "userId": 3,
            "userEmail": "emaipwl3",
            "userName": "왈왈4",
            "profileImg": null
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://3.34.190.41/recommend', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecommend(data);
                console.log(recommend);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleFollowClick = () => {
        // 모달짜기
    }

    return (
        <div className={css.dataList}>
            <div className={css.profile}>
                
                <div className={css.textData}>
                    <p className={css.id}>@{profile.userEmail}</p>
                    <p className={css.name}>{profile.userName}</p>
                </div>
            </div>
            <div className={css.follow}>
                <p className={css.texts}
                    onClick={handleFollowClick}
                >팔로잉<span>{followings.length}</span></p>
                <p className={css.texts}
                    onClick={handleFollowClick}
                >팔로워<span>{followers.length}</span></p>
            </div>
            <div className={css.underLine}>
                <img src={underLine}></img>
            </div>
            <div>
                <ul className={css.recommendFriend}>{
                    recommend.map((user) => (
                        <div key={user.userId}>
                            {/* <img src={user.profileImg}></img> */}
                            <RandomImage/>
                            <div>
                                <p>@{user.userEmail}</p>
                                <p>{user.userName}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Mainmydata;