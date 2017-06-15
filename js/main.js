(function() {

    'use strict';
    var usernameUrl = 'https://api.github.com/users/cdhorn515';
    var repoUrl = 'https://api.github.com/users/cdhorn515/repos?sort=updated';
    var orgsUrl = 'https://api.github.com/users/cdhorn515/orgs';
    //use github api token for development purposes
    //will not be present in production
    var headers = {
    };
    //will be passed into the options object called headers, usually will be called headers as well. This var is passed in and will contain all of the header options you want in your fetch request
    if (GITHUB_TOKEN) {
      //set the AJAX header to send the token
      headers.Authorization = 'token ' + GITHUB_TOKEN;
    }
    var profileSection = document.getElementById('profile');


    fetch(usernameUrl, {
      headers: headers
    }).then(function(response) {
      response.json().then(function(profile) {
        console.log(profile);
        displayProfile(profile);
      });
    });

    function displayProfile(profile) {
      var pic = document.createElement('div');
      pic.innerHTML = '<img src = "' + profile.avatar_url + '">';
      profileSection.appendChild(pic);

      var name = document.createElement('h3');
      name.textContent = profile.name;
      profileSection.appendChild(name);

      var loginName = document.createElement('h3');
      loginName.textContent = profile.login;
      profileSection.appendChild(loginName);

      var bio = document.createElement('p');
      bio.innerHTML = profile.bio;
      profileSection.appendChild(bio);

      var location = document.createElement('h5');
      location.textContent = profile.location;
      profileSection.appendChild(location);

      var email = document.createElement('a');
      email.href = profile.email;
      email.textContent = profile.email
      profileSection.appendChild(email);

      var joined = document.createElement('h5');
      var memberSince = moment(profile.created_at).format('MM Do YYYY');
      joined.innerHTML = memberSince;
      profileSection.appendChild(joined);
    }

    fetch(repoUrl, {
      headers: headers
    }).then(function(res) {
      res.json().then(function(repos) {
        console.log(repos);

        for (var i = 0; i < repos.length; i++) {
          var repo = repos[i];
          displayRepo(repo);
        }
      });
    });

    var repoSection = document.getElementById('repos');

    function displayRepo(repo){
      // var repoList = document.getElementById('repos');


      var repoList = document.createElement('div');
      repoSection.appendChild(repoList);

      var repoNode = document.createElement('div');
      repoNode.textContent = repo.name;
      repoList.appendChild(repoNode);

      var repoLanguage = document.createElement('span');
      repoLanguage.textContent = repo.language;
      repoList.appendChild(repoLanguage);

      var repoUpdate = document.createElement('span');
      var lastUpdate = moment(repo.updated_at).fromNow();
      repoUpdate.textContent = lastUpdate;
      repoList.appendChild(repoUpdate);
     }
// repoList.appendChild(repoDiv);


      // repoDiv.innerHTML = `
      //   <span>
      //    ${repo.name}
      //   </span>
      // `;




  // console.log(orgsUrl);

  // console.log(repoUrl);

  // , {headers: myHeaders}).then(function(){


  // });

}());
