(function() {

    'use strict';
    var usernameUrl = 'https://api.github.com/users/cdhorn515';
    var repoUrl = 'https://api.github.com/users/cdhorn515/repos?sort=updated';
    var orgsUrl = 'https://api.github.com/user/orgs';
    //use github api token for development purposes
    //will not be present in production
    var headers = {};
    //will be passed into the options object called headers, usually will be called headers as well. This var is passed in and will contain all of the header options you want in your fetch request
    // if (GITHUB_TOKEN)



    try {
      //set the AJAX header to send the token
      headers.Authorization = 'token ' + GITHUB_TOKEN;
    } catch (e) {
      //ignore error
    }

    var profileSection = document.getElementById('profile');

    // ***************************profile section
    fetch(usernameUrl, {
      headers: headers
    }).then(function(response) {
      response.json().then(function(profile) {
        // console.log(profile);
        displayProfile(profile);
      });
    });

    function displayProfile(profile) {
      var pic = document.createElement('div');
      pic.setAttribute('class', 'profilepic');
      pic.innerHTML = '<img src = "' + profile.avatar_url + '">';
      profileSection.appendChild(pic);
      pic.style.height = "230px";
      pic.style.width = "230px";
      pic.style.borderRadius = "5px";

      var name = document.createElement('h3');
      name.textContent = profile.name;
      profileSection.appendChild(name);

      var loginName = document.createElement('h3');
      loginName.textContent = profile.login;
      loginName.style.fontWeight = 'lighter';
      profileSection.appendChild(loginName);

      var bio = document.createElement('div');
      bio.setAttribute('class', 'bio-text');
      bio.innerHTML = profile.bio;
      profileSection.appendChild(bio);

      var location = document.createElement('h5');
      location.textContent = profile.location;
      location.setAttribute('class', 'fa fa-map-marker fa-lg');
      location.setAttribute('style', 'margin-left: 5px');
      profileSection.appendChild(location);

      var emailSpan = document.createElement('p');
      profileSection.appendChild(emailSpan);

      var email = document.createElement('a');
      // email.setAttribute('class', 'fa fa-envelope-o sm');
      email.href = profile.email;
      email.textContent = profile.email;
      emailSpan.appendChild(email);

      var faEnvelopeSpan = document.createElement('span');
      email.setAttribute('class', 'fa fa-envelope-o fa-lg');
      email.setAttribute('style', 'margin-left: 5px');
      emailSpan.appendChild(faEnvelopeSpan);

      var joined = document.createElement('h5');
      var memberSince = moment(profile.created_at).format('MMMM Do YYYY');
      joined.innerHTML = 'Created on: ' + memberSince;
      profileSection.appendChild(joined);
    }
    // *************************Repository section
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
    //display all repos
    function displayRepo(repo) {
      // outer container that holds all repo info
      var repoNode = document.createElement('div');
      repoNode.classList.add('repoInfoContainer');
      repoSection.appendChild(repoNode);
      // inner container that hold title of repo which is a link
      var repoName = document.createElement('div');
      repoName.classList.add('repo-info');
      repoNode.appendChild(repoName);
      // circle beside language
      var repoLanguage = repo.language;

var languageContainerNode = document.createElement('div');
languageContainerNode.classList.add('info-cont');
repoNode.appendChild(languageContainerNode);

      var coloredCircle = document.createElement('div');
      coloredCircle.classList.add('color-circle');
      languageContainerNode.appendChild(coloredCircle);
      if (repoLanguage === 'JavaScript') {
        coloredCircle.style.backgroundColor = '#f1e05a';
      } else {
        if (repoLanguage === 'CSS') {
          coloredCircle.style.backggroundColor = '#563d7c';
        } else {
          if (repoLanguage === 'HTML') {
            coloredCircle.style.backgroundColor = '#563d7c';
          } else {
            if (repoLanguage === 'PHP') {
              coloredCircle.style.backgroundColor = '#4F5D95';
            } else {
              coloredCircle.style.width = '12px';
              coloredCircle.style.height = '12px';
            }
          }
        }
      }

        // anchor link for title of repo
        var repoNameLink = document.createElement('a');
        repoNameLink.href = repo.html_url;
        repoNameLink.textContent = repo.name;
        repoName.appendChild(repoNameLink);
        // language node
        var repoLanguage = document.createElement('span');
        repoLanguage.classList.add('repoLangTxt');
        repoLanguage.textContent = repo.language;
        languageContainerNode.appendChild(repoLanguage);
        // displayed if there are forked repositories

        var numOfForks = repo.forks;
        console.log('here: ', numOfForks);
      // numOfForks = parseInt(numOfForks);
        if (numOfForks > 0) {
          var forkedNode = document.createElement('span');
          forkedNode.innerHTML = numOfForks;
          forkedNode.setAttribute('class', 'fa fa-code-fork fa-lg repoLangTxt');
          languageContainerNode.appendChild(forkedNode);
        }
        // latest update for repository
        var repoUpdate = document.createElement('span');
        repoLanguage.classList.add('repoLangTxt')
        var lastUpdate = moment(repo.updated_at).fromNow();
        repoUpdate.textContent = lastUpdate;
        languageContainerNode.appendChild(repoUpdate);
      }
// --------------Orgs call


fetch(orgsUrl, {
    headers: headers
  }).then(function(res) {
  res.json().then(function(orgs) {
    console.log('orgs: ', orgs);
    for (var i = 0; i < orgs.length; i++) {
      var orgs = orgs[i];
      displayOrgs(orgs);
    }
  })
});
var organizationNode = document.getElementById('organizations');

function displayOrgs(orgs){
  var organizationHeadingNode = document.createElement('h3');
  organizationHeadingNode.setAttribute('class', 'organization');
  organizationHeadingNode.textContent = "Organizations";
  organizationNode.appendChild(organizationHeadingNode);

  var organizationAvatarNode = document.createElement('div');
  organizationAvatarNode.setAttribute('class', 'orgavatar');
  organizationAvatarNode.innerHTML = '<img src = "' + orgs.avatar_url + '">';
  organizationHeadingNode.appendChild(organizationAvatarNode);
}
// pic.style.height = "230px";
// pic.style.width = "230px";
// pic.style.borderRadius = "5px";
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
