import React, { useEffect, useState } from "react";
import "./Search.css";
import UserCardComponent from "../User-card/UserCard-component";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const SearchComponent = ({ currentUser, setLastPostPlace }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  let [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState();
  const [isSearch, setIsSearch] = useState(true);
  useEffect(() => {
    AuthService.getUsers()
      .then((data) => {
        setUserData(data.data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleTextArea = (e) => {
    setSearch(e.target.value);
  };

  let handleSubmit = () => {
    if (search) {
      AuthService.searchUser(search)
        .then((data) => {
          console.log(data);
          setUserSearch(data.data.user);
          setIsSearch(true);
        })
        .catch((e) => {
          console.log(e);
          setUserSearch("");
          setIsSearch(false);
        });
    }
  };

  return (
    <div className="mainbg">
      <div className="searchBar">
        <input type="text" placeholder="Search..." onChange={handleTextArea} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div className="userCardContainer">
        {userSearch && userSearch.length != 0 && (
          <div>
            <UserCardComponent
              currentUser={currentUser}
              user={userSearch}
              setLastPostPlace={setLastPostPlace}
            />
            <h4>All Users</h4>
          </div>
        )}
        {!isSearch && (
          <div>
            <h4>Not Users found...</h4>
            <hr />
            <h4>All Users</h4>
          </div>
        )}
        {userData && userData.length != 0 && (
          <div>
            {userData
              .slice(0)
              .reverse()
              .map((post) => {
                return (
                  <UserCardComponent
                    currentUser={currentUser}
                    user={post}
                    setLastPostPlace={setLastPostPlace}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
