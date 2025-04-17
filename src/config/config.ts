export const siteConfig = {
  name: 'Skylar Pearl',
  pronouns: 'She/Her',
  role: 'Full Stack Developer',
  bio: 'Passionate software developer with expertise in React, Node.js, and cloud technologies. I love building scalable applications and contributing to open-source projects.',
  photo: 'https://static.nobleskye.dev/pfp.png', //link to your pfp, or if you know the path from index.js
  social: {
    github: 'https://github.com/nobleskye',
    bsky: 'https://bsky.app/profile/nobleskye.dev',
    SkyeNetwork: 'https://uwu.skyenet.co.in', //you arent apart of skyenet so you can remove this
  }, 
  //your contact info
  contact: {
    email: 'contact@nobleskye.dev',
    location: 'Somewhere, USA',
  },




  certs: [
    // needs: name provider aquired  aquired  //order doesnt matter 
    { name: 'Security Plus', provider: 'CompTIA', acquired: '2025-Apr-16', expires: '2028-Apr-16',  },
    { name: 'IT Fundamentals', provider: 'CompTIA', acquired: '2024-Aug-22', expires: 'Never' },
  ], 
  
  
  skills: [
    // name and your confidence in your skill
    { name: 'Hosting Minecraft Server Network', level: 100 },
    { name: 'MC Function', level: 90 },
    { name: 'Cybersecurity', level: 70 },
    { name: 'Git', level: 80 },
    { name: 'Vite', level: 80 },
    { name: 'Java', level: 50 },
    { name: 'Linux', level: 70 },
    { name: 'Remote Server Management', level: 60 },

],

//replace with your username
githubUsername: 'NobleSkye',
featuredRepos: [
  // the repo url so github.com/username/{reponame} is used here
  'NobleSkye',
  'blahaj.bio',
  'search.nobleskye.dev',
  'SkyePerms',
  'CEM-S'
],

//keep private repos so they stay private, or can add other repos that are public if you dont want to cluder the page
excludedRepos: ['private-repo'],
github: {
  apiUrl: 'https://api.github.com',
  reposPerPage: 12,


// updates // soon to add other search things (gotta find em first)
  repoSort: 'updates',
},
};
