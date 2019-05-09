/*
 *  crazybioGame: CrazyBioComputing Game Engine
 *  Copyright (C) 2015-2018  Jean-Christophe Taveau.
 *
 *  This file is part of crazybioGame
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with crazybioGame.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */


'use strict';

class AssetLoader {
  /**
   * @constructor
   *
   */
  constructor(storyboard) {

    // Get Assets from the storyboard
    this.assets = this.getAssets(storyboard);
  }

  /**
   * Get all the assets contained in the storyboard except the `deferred`
   *
   */
  getAssets(json) {

    // Function to get media types (image,audio, video, and svg)
    const getTypes = (keys) => {
      const types = {
        image: "img",
        audio: "audio",
        svg: "svg",
        video: "video"
      }
      let filtered = keys.filter((keyword) => Object.keys(types).includes(keyword));
      return types[filtered[0]];
    }

    // Function to get one asset
    const getAsset = (accu, obj) => {
      if (obj.class !== "deferred" && obj.author == undefined){
        if (obj.display.media !== undefined) {
          let asset = {
            id: obj.id,
            path: obj.display.media.image || obj.display.media.svg || obj.display.media.video || obj.display.media.audio || "none",
            type: getTypes(Object.keys(obj.display.media)) || "none"
          }
          accu.push(asset);
        }
      }
      return accu;
    }

    //////////////: MAIN ://////////////

    let assets = json.reduce(getAsset, []);
    console.log(assets);
    return assets;
  }



  /**
   * Pre-load all media
   */
  preload() {
    let all_promises = [];
    this.assets.forEach((asset, index) => {
      all_promises.push(this.fetch_media(asset));
    });
    console.log(all_promises);

    return Promise.all(all_promises);
  }

  /**
   * Pre-load single media
   */
  fetch_media(media) {
    if (media.type === "svg") {
      return fetch(media.path).then((response) => {
        return response.text();
      })
        .then((svg) => {
          document.getElementById("media").insertAdjacentHTML("afterbegin", svg);
          console.log('SVG');
          console.log(document.getElementById("media").firstChild);
          document.getElementById("media").firstChild.nextElementSibling.id = `asset_${media.id}`;
          return 'loaded';
        });
    }
    else {
      return fetch(media.path)
        .then((response) => {
          return response.blob();
        })
        .then((myBlob) => {
          let objectURL = URL.createObjectURL(myBlob);
          let media_html = document.createElement(media.type);
          media_html.src = objectURL;
          media_html.id = `asset_${media.id}`;
          media_html.dataset.src = media.path;
          let div_media = document.getElementById("media");
          div_media.appendChild(media_html);
          console.log(`Create ${media_html.id}`);
          return 'loaded';
        });
    }
  }

}

