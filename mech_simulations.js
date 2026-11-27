/**
 * MECH TKMCE 2.0 — INTERACTIVE ENGINEERING SIMULATION LAB
 * Verified Mechanical Engineering visualizers:
 * 1. Mohr's Circle & 2D Principal Stress State
 * 2. Thermodynamic Cycle Visualizer (Carnot / Brayton / Otto P-V Diagram)
 * 3. Venturi Flow & Bernoulli Equation Manometer
 * 4. Simply Supported Beam Bending & Deflection Visualizer
 */

window.MECH_SIM = {
  // 1. MOHR'S CIRCLE
  renderMohrsCircle: function(canvasId, sx, sy, txy) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const axisColor = isDark ? '#475569' : '#cbd5e1';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const circleColor = '#2563eb';
    const radiusLineColor = isDark ? '#f59e0b' : '#d97706';

    const cx = (sx + sy) / 2;
    const r = Math.sqrt(Math.pow((sx - sy) / 2, 2) + Math.pow(txy, 2));
    const s1 = cx + r;
    const s2 = cx - r;
    const tmax = r;
    const thetaP = (Math.atan2(2 * txy, sx - sy) * 180 / Math.PI) / 2;

    // Scale to fit canvas
    const maxVal = Math.max(Math.abs(s1), Math.abs(s2), tmax, 100) * 1.35;
    const originX = w / 2;
    const originY = h / 2;
    const scale = (w / 2 - 40) / maxVal;

    // Axes
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(w - 20, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, h - 20);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = textColor;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('σ (Normal Stress, MPa)', w - 150, originY - 10);
    ctx.fillText('τ (Shear, MPa)', originX + 10, 30);

    // Circle
    const circleCenterX = originX + cx * scale;
    const circleCenterY = originY;
    const circleRadius = r * scale;

    ctx.strokeStyle = circleColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Center point
    ctx.fillStyle = radiusLineColor;
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Stress Points A(sx, -txy) and B(sy, txy)
    const ptAx = originX + sx * scale;
    const ptAy = originY + txy * scale;
    const ptBx = originX + sy * scale;
    const ptBy = originY - txy * scale;

    ctx.strokeStyle = radiusLineColor;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ptAx, ptAy);
    ctx.lineTo(ptBx, ptBy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Principal Stress Markers
    const s1X = originX + s1 * scale;
    const s2X = originX + s2 * scale;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(s1X, originY, 4, 0, 2 * Math.PI);
    ctx.arc(s2X, originY, 4, 0, 2 * Math.PI);
    ctx.fill();

    return { s1: s1.toFixed(1), s2: s2.toFixed(1), tmax: tmax.toFixed(1), thetaP: thetaP.toFixed(1) };
  },

  // 2. THERMODYNAMIC CARNOT / BRAYTON CYCLE
  renderCycle: function(canvasId, rComp, tMax) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const axisColor = isDark ? '#475569' : '#cbd5e1';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const pathColor = '#2563eb';

    // Axes
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(50, h - 40);
    ctx.lineTo(w - 30, h - 40);
    ctx.stroke();

    // Labels
    ctx.fillStyle = textColor;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Pressure (P)', 15, 25);
    ctx.fillText('Volume (V)', w - 80, h - 15);

    // Brayton / Otto Cycle state coordinates
    const v1 = w * 0.75;
    const v2 = v1 / rComp;
    const p1 = h - 70;
    const p2 = p1 - (h * 0.35);
    const p3 = p2 - (tMax / 1800) * (h * 0.3);
    const p4 = p1 - (tMax / 1800) * (h * 0.15);

    // Draw Cycle Path
    ctx.strokeStyle = pathColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(v1, p1); // State 1
    ctx.bezierCurveTo((v1 + v2) / 2, p1 - 20, v2 + 20, p2 + 20, v2, p2); // 1-2 Isentropic
    ctx.lineTo(v2, p3); // 2-3 Constant Volume / Isobaric
    ctx.bezierCurveTo((v1 + v2) / 2, p3 + 30, v1 - 30, p4 - 10, v1, p4); // 3-4 Expansion
    ctx.closePath();
    ctx.stroke();

    // Shaded work area
    ctx.fillStyle = isDark ? 'rgba(37, 99, 235, 0.18)' : 'rgba(37, 99, 235, 0.1)';
    ctx.fill();

    // State point labels
    ctx.fillStyle = isDark ? '#f59e0b' : '#d97706';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.fillText('1', v1 + 8, p1);
    ctx.fillText('2', v2 - 16, p2);
    ctx.fillText('3', v2 - 16, p3);
    ctx.fillText('4', v1 + 8, p4);

    const gamma = 1.4;
    const etaOtto = (1 - (1 / Math.pow(rComp, gamma - 1))) * 100;
    return { eta: etaOtto.toFixed(1) };
  },

  // 3. VENTURI FLOW & BERNOULLI MANOMETER
  renderVenturi: function(canvasId, d1, d2, flowQ) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const pipeColor = isDark ? '#334155' : '#94a3b8';
    const fluidColor = isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(37, 99, 235, 0.25)';
    const textColor = isDark ? '#f8fafc' : '#0f172a';

    const a1 = Math.PI * Math.pow(d1 / 200, 2);
    const a2 = Math.PI * Math.pow(d2 / 200, 2);
    const v1 = (flowQ / 1000) / a1;
    const v2 = (flowQ / 1000) / a2;
    const rho = 1000; // Water
    const deltaP = 0.5 * rho * (v2 * v2 - v1 * v1);
    const deltaH = (deltaP / (rho * 9.81)) * 100; // cm of water

    // Draw Venturi Tube profile
    const centerY = h * 0.65;
    const r1 = 38;
    const r2 = r1 * (d2 / d1);

    ctx.fillStyle = fluidColor;
    ctx.strokeStyle = pipeColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(30, centerY - r1);
    ctx.lineTo(130, centerY - r1);
    ctx.bezierCurveTo(180, centerY - r1, 200, centerY - r2, 250, centerY - r2);
    ctx.lineTo(290, centerY - r2);
    ctx.bezierCurveTo(340, centerY - r2, 360, centerY - r1, 410, centerY - r1);
    ctx.lineTo(w - 30, centerY - r1);

    ctx.lineTo(w - 30, centerY + r1);
    ctx.lineTo(410, centerY + r1);
    ctx.bezierCurveTo(360, centerY + r1, 340, centerY + r2, 290, centerY + r2);
    ctx.lineTo(250, centerY + r2);
    ctx.bezierCurveTo(200, centerY + r2, 180, centerY + r1, 130, centerY + r1);
    ctx.lineTo(30, centerY + r1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Manometer Columns
    const h1Height = 85;
    const h2Height = Math.max(15, h1Height - (deltaH * 1.5));

    // Inlet Manometer
    ctx.strokeStyle = pipeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(100, centerY - r1 - 100, 20, 100);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(101, centerY - r1 - h1Height, 18, h1Height);

    // Throat Manometer
    ctx.strokeRect(260, centerY - r2 - 100, 20, 100);
    ctx.fillRect(261, centerY - r2 - h2Height, 18, h2Height);

    ctx.fillStyle = textColor;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('v1 = ' + v1.toFixed(2) + ' m/s', 80, centerY + r1 + 25);
    ctx.fillText('v2 = ' + v2.toFixed(2) + ' m/s (Throat)', 240, centerY + r2 + 25);
    ctx.fillText('Δh = ' + deltaH.toFixed(1) + ' cm', 290, centerY - r2 - 70);

    return { v1: v1.toFixed(2), v2: v2.toFixed(2), deltaP: (deltaP / 1000).toFixed(2), deltaH: deltaH.toFixed(1) };
  },

  // 4. BEAM BENDING DEFLECTION
  renderBeam: function(canvasId, lengthL, loadW, posA) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8fafc' : '#0f172a';
    const beamColor = isDark ? '#64748b' : '#334155';
    const loadColor = '#ef4444';
    const elasticCurveColor = '#2563eb';

    const startX = 60;
    const endX = w - 60;
    const beamLenPx = endX - startX;
    const beamY = h * 0.4;
    const loadXPx = startX + (posA / lengthL) * beamLenPx;

    // Neutral Axis
    ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(startX, beamY);
    ctx.lineTo(endX, beamY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Deflected Elastic Curve (Bending Shape)
    ctx.strokeStyle = elasticCurveColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(startX, beamY);
    for (let x = 0; x <= beamLenPx; x += 4) {
      const realX = (x / beamLenPx) * lengthL;
      let yDeflect = 0;
      const b = lengthL - posA;
      if (realX <= posA) {
        yDeflect = (loadW * b * realX / (6 * 200 * lengthL)) * (lengthL * lengthL - b * b - realX * realX);
      } else {
        yDeflect = (loadW * posA * (lengthL - realX) / (6 * 200 * lengthL)) * (lengthL * lengthL - posA * posA - Math.pow(lengthL - realX, 2));
      }
      ctx.lineTo(startX + x, beamY + Math.min(yDeflect * 12, 60));
    }
    ctx.stroke();

    // Supports (Pin at A, Roller at B)
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    // Triangle at left
    ctx.beginPath();
    ctx.moveTo(startX, beamY + 4);
    ctx.lineTo(startX - 12, beamY + 22);
    ctx.lineTo(startX + 12, beamY + 22);
    ctx.closePath();
    ctx.fill();

    // Triangle + circles at right
    ctx.beginPath();
    ctx.moveTo(endX, beamY + 4);
    ctx.lineTo(endX - 12, beamY + 18);
    ctx.lineTo(endX + 12, beamY + 18);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endX - 6, beamY + 22, 3, 0, Math.PI * 2);
    ctx.arc(endX + 6, beamY + 22, 3, 0, Math.PI * 2);
    ctx.fill();

    // Load Arrow
    ctx.strokeStyle = loadColor;
    ctx.fillStyle = loadColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(loadXPx, beamY - 45);
    ctx.lineTo(loadXPx, beamY - 2);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(loadXPx - 6, beamY - 12);
    ctx.lineTo(loadXPx + 6, beamY - 12);
    ctx.lineTo(loadXPx, beamY);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.fillText('W = ' + loadW + ' kN', loadXPx - 30, beamY - 52);

    // Max Bending Moment M_max = W * a * b / L
    const b = lengthL - posA;
    const maxMoment = (loadW * posA * b) / lengthL;
    const ra = (loadW * b) / lengthL;
    const rb = (loadW * posA) / lengthL;

    ctx.fillStyle = textColor;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Support Reaction R_A = ' + ra.toFixed(2) + ' kN', startX - 20, beamY + 40);
    ctx.fillText('Support Reaction R_B = ' + rb.toFixed(2) + ' kN', endX - 110, beamY + 40);

    return { maxMoment: maxMoment.toFixed(2), ra: ra.toFixed(2), rb: rb.toFixed(2) };
  }
};
