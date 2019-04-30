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

class DrawTools {

  // Clear Canvas
  static clearCanvas(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // Draw polyline...
  static drawPolyline(canvas,primitive,X, Y) {

    primitive.last.x = X - primitive.offsetX;
    primitive.last.y = Y - primitive.offsetY;

    let ctx = canvas.getContext('2d');
    DrawTools.clearCanvas(canvas);

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.lineWidth = 20;
    let half = 0; // ctx.lineWidth / 2.0;
    primitive.points.forEach( (p,index) => {
      if (index == 0) {
        ctx.moveTo(p.x - half,p.y - half);
      }
      else {
        ctx.lineTo(p.x  + half, p.y  + half);
      }
    })

    if (X !== -1 && Y !== -1) {
      ctx.lineTo(primitive.last.x  + half, primitive.last.y  + half);
    }
    ctx.stroke();
    ctx.closePath();

  }

} //End of class DrawTools
