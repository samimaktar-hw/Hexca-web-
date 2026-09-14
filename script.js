/* =========================================================
   SEARCH SYSTEM (External script.js)
========================================================= */

window.handleSearch = function(q){
  const query = q.toLowerCase().trim();
  const resDiv = document.getElementById("searchResults");

  if(!query){
    resDiv.style.display = "none";
    return;
  }

  let html = "";
  let found = false;

  // Search APKs
  const apks = appData.apk.filter(a =>
    a.name.toLowerCase().includes(query) ||
    (a.desc && a.desc.toLowerCase().includes(query))
  );

  if(apks.length){
    found = true;
    html += `<h4><i class="fa-solid fa-box-open"></i> APK LINKS</h4>`;
    apks.forEach(a => {
      const url = safeUrl(a.url);
      if(!url) return;
      html += `
        <a href="${esc(url)}" target="_blank" class="search-item">
          <i class="fa-solid fa-download"></i>
          <div class="search-item-text">
            <strong>${esc(a.name)}</strong>
            <small>${esc(a.desc || "Download APK")}</small>
          </div>
        </a>
      `;
    });
  }

  // Search Videos
  const vids = appData.videos.filter(v =>
    v.title.toLowerCase().includes(query)
  );

  if(vids.length){
    found = true;
    html += `<h4 style="margin-top: 15px;"><i class="fa-brands fa-youtube"></i> VIDEOS</h4>`;
    vids.forEach(v => {
      const url = safeUrl(v.url);
      if(!url) return;
      html += `
        <a href="${esc(url)}" target="_blank" class="search-item">
          <i class="fa-solid fa-play"></i>
          <div class="search-item-text">
            <strong>${esc(v.title)}</strong>
            <small>Watch Video</small>
          </div>
        </a>
      `;
    });
  }

  // Search Social Links
  const socs = appData.social.filter(s =>
    s.name.toLowerCase().includes(query)
  );

  if(socs.length){
    found = true;
    html += `<h4 style="margin-top: 15px;"><i class="fa-solid fa-users"></i> SOCIAL LINKS</h4>`;
    socs.forEach(s => {
      const url = safeUrl(s.url);
      if(!url) return;
      html += `
        <a href="${esc(url)}" target="_blank" class="search-item">
          <i class="${esc(s.icon)}"></i>
          <div class="search-item-text">
            <strong>${esc(s.name)}</strong>
            <small>Connect with us</small>
          </div>
        </a>
      `;
    });
  }

  // If nothing is found
  if(!found){
    html = `<div style="text-align:center; color:#caffd2; padding: 15px 0;">No results found for "<b>${esc(query)}</b>"</div>`;
  }

  resDiv.innerHTML = html;
  resDiv.style.display = "block";
};
