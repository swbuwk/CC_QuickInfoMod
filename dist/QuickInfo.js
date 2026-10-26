(() => {
  "use strict";
  const e = { buffTimers: [], natGCOnScreen: !1 },
    n = { red: [255, 42, 75], green: [2, 253, 2] },
    t = {
      red: `rgb(${n.red.join(", ")})`,
      green: `rgb(${n.green.join(", ")})`,
    },
    i = {
      frenzy: "F",
      click_frenzy: "CF",
      dragon_harvest: "DH",
      dragonflight: "DF",
      cursed_finger: "CuF",
      cookie_storm: "CS",
      blood_frenzy: "EF",
      sugar_frenzy: "SF",
      sugar_blessing: "SB",
      loan_1: "L1",
      loan_2: "L2",
      loan_3: "L3",
      loan_1_interest: "L1 (I)",
      loan_2_interest: "L2 (I)",
      loan_3_interest: "L3 (I)",
      haggler_luck: "Hagglers (+)",
      pixie_luck: "Pixies (+)",
      magic_adept: "DI (+)",
      haggler_misery: "Hagglers (-)",
      pixie_misery: "Pixies (-)",
      magic_inept: "DI (-)",
    },
    a = ["click_frenzy", "dragonflight", "cursed_finger", "devastation"],
    s = [
      "Cursor",
      "Grandma",
      "Farm",
      "Mine",
      "Factory",
      "Bank",
      "Temple",
      "Wizard Tower",
      "Shipment",
      "Alchemy Lab",
      "Portal",
      "Time Machine",
      "Antim. Condenser",
      "Prism",
      "Chancemaker",
      "Fractal engine",
      "Javascript console",
      "Idleverse",
      "Cortex baker",
      "You",
    ],
    o = (e) => `QT_${e}`,
    r = (e) => l(o(e)),
    d = (e, n, t = "flex") => {
      e && (e.style.display = n ? t : "none");
    },
    c = (e, n = u.guiScale) => {
      ((e.style.height = 16 * n + "px"), (e.style.fontSize = 12 * n + "px"));
    },
    f = () => `calc(100% - ${20 + (u.showOldBuffTImers ? 50 : 0)}px)`,
    m = [
      {
        title: "Appearance",
        options: [
          {
            id: "guiScale",
            name: "GUI Scale",
            description: "(scales the timer GUI)",
            type: "slider",
            min: 0.5,
            max: 2,
            step: 0.1,
            default: 1,
            valueFormat: (e) => `x${e}`,
            onChange: (e) =>
              ((e = u.guiScale) => {
                const n = l("QTContainer");
                n &&
                  n.querySelectorAll("div").forEach((n) => {
                    c(n, e);
                  });
              })(e),
          },
          {
            id: "showGCTimer",
            name: "Show Golden Cookie timer",
            description: "(toggles Golden Cookie timer visibility)",
            type: "boolean",
            default: !0,
            onChange: (e) => d(r("GCTimer"), e),
          },
          {
            id: "showBuffToggler",
            name: "Show buff toggler",
            description:
              '(toggles toggler visibility a.k.a "Hide buffs" button (meta toggler time))',
            type: "boolean",
            default: !0,
            onChange: (e) => d(r("buffToggler"), e),
          },
          {
            id: "shortBuffNames",
            name: "Short buff names",
            description:
              "(shortens the buff names (e.g. Click Frenzy -> CF, Building specal -> BS))",
            type: "boolean",
            default: !1,
          },
          {
            id: "showBuildingName",
            name: "Show building names",
            description:
              '(shows the building names on the "building special" buffs)',
            type: "boolean",
            default: !1,
          },
          {
            id: "showMultipliers",
            name: "Show buff mult.",
            description: "(shows the buff multipliers)",
            type: "boolean",
            default: !0,
          },
        ],
      },
      {
        title: "Highlighting",
        options: [
          {
            id: "highlightExistingBuffs",
            name: "Highlight existing buffs",
            description: "(highlights the buffs that you already have)",
            type: "boolean",
            default: !0,
          },
          {
            id: "warnLastingBuffs",
            name: "Warn lasting buffs",
            description:
              "(warns you when you have a buff that will expire in less than 10 seconds)",
            type: "boolean",
            default: !0,
            onChange: (e) => {
              l("QTContainer")?.classList.toggle("qt_warnOff", !e);
            },
          },
        ],
      },
      {
        title: "Misc",
        options: [
          {
            id: "updateFrequency",
            name: "Update Frequency",
            description:
              "(changes how often the buff timers are updated, low tick values can cause minor lag)",
            type: "slider",
            min: 0,
            max: 100.1,
            step: 2,
            default: 10,
            valueFormat: (e) => (0 === e ? "every tick" : `every ${e} ticks`),
          },
          {
            id: "showOldBuffTImers",
            name: "Show old buff timers",
            description:
              "(shows the old buff timers, just if you wanna see them idk)",
            type: "boolean",
            default: !0,
            onChange: (e) => {
              if ((d(l("buffs"), e, "block"), u.alternativeBuffStacking)) {
                const e = l("QTContainer");
                e && (e.style.width = f());
              }
            },
          },
          {
            id: "alternativeBuffStacking",
            name: "Alt. buffs stacking",
            description:
              "(toggles the buff stacking from vertical to horizontal)",
            type: "boolean",
            default: !1,
            onChange: (e) =>
              ((e) => {
                const n = l("QTContainer");
                n &&
                  (e
                    ? (n.classList.add("qt_altStacking"), (n.style.width = f()))
                    : (n.classList.remove("qt_altStacking"),
                      (n.style.width = "")));
              })(e),
          },
          {
            id: "formatLongTimers",
            name: "Format long timers",
            description:
              "(formats buffs longer than a minute as Xm Xs / Xh Xm Xs)",
            type: "boolean",
            default: !1,
          },
          {
            id: "showTotalBuffMultiplier",
            name: "Show total buff multiplier",
            description: "(shows the combined multiplier of all active buffs)",
            type: "boolean",
            default: !1,
            onChange: (e) => d(r("totalMult"), e),
          },
        ],
      },
    ],
    u = {
      ...Object.fromEntries(
        m.flatMap((e) => e.options.map((e) => [e.id, e.default])),
      ),
      collapseSettings: !1,
    },
    p = (e) => {
      const { type: n, arg2: t } = e,
        { name: i } = n;
      return (i.includes("building") ? `${i}_${t}` : i).replaceAll(" ", "_");
    },
    g = p,
    h = (e) => {
      const n = p(e);
      let t;
      return (
        (t = u.shortBuffNames
          ? n.includes("building_buff")
            ? "BS"
            : n.includes("building_debuff")
              ? "Rust"
              : i[n] || e?.name
          : e?.name),
        u.showBuildingName &&
          n.includes("building") &&
          (t += ` (${((e) => {
            const { arg2: n } = e;
            return void 0 === n ? "" : s[n];
          })(e)})`),
        t
      );
    },
    b = (e) => {
      const n = p(e);
      return (a.includes(n) ? e.multClick : e.multCpS) || 1;
    },
    y = (e) => {
      const n = document.createElement("div");
      return (
        (n.id = o(e)),
        n.classList.add("qt_infoBlock"),
        c(n),
        l("QTContainer")?.appendChild(n),
        n
      );
    },
    T = () => {
      if (!u.showBuffTimers) return;
      if (
        (Object.keys(Game.buffs).forEach((n) => {
          const i = Game.buffs[n];
          if (!i) return;
          const { time: a } = i,
            s = g(i),
            o = Math.ceil(a / Game.fps),
            l = h(i),
            d = ((e) => {
              const { icon: n } = e,
                t = 18 * u.guiScale;
              return `\n    <div style="width: ${t}px; height: ${t}px; background-image: url(http://cdn.dashnet.org/cookieclicker/beta/img/icons.png?v=2.052); background-size: ${36 * t + "px"}; background-position: ${-n[0] * t}px ${-n[1] * t}px"></div>\n  `;
            })(i),
            c = b(i),
            f = c > 1 ? t.green : t.red;
          e.buffTimers.find((e) => e.id === s) ||
            (y(s), e.buffTimers.push({ id: s, key: n }));
          const m = r(s);
          if (!m) return;
          m.classList.toggle("qt_warning", o <= 10);
          const p = 0 !== c && u.showMultipliers;
          m.innerHTML = `\n      ${d}<span>${l}: ${((e) => {
            if (!u.formatLongTimers || e < 60) return `${e}s`;
            const n = Math.floor(e / 3600),
              t = Math.floor((e % 3600) / 60),
              i = e % 60;
            return n > 0 ? `${n}h ${t}m ${i}s` : `${t}m ${i}s`;
          })(
            o,
          )}</span> <span style="color: ${f}; display: ${p ? "inline" : "none"};">x${parseFloat(c.toFixed(1))}</span>\n    `;
        }),
        e.buffTimers.length === Object.keys(Game.buffs).length)
      )
        return;
      const n = new Set(Object.keys(Game.buffs)),
        i = [];
      (e.buffTimers.forEach((e) => {
        n.has(e.key) || (r(e.id)?.remove(), i.push(e.id));
      }),
        i.length &&
          (e.buffTimers = e.buffTimers.filter((e) => !i.includes(e.id))));
    },
    x = () => {
      if (!u.showTotalBuffMultiplier) return;
      const e = r("totalMult");
      if (!e) return;
      let n = 1;
      Object.keys(Game.buffs).forEach((e) => {
        const t = Game.buffs[e];
        if (!t) return;
        const i = b(t);
        i && (n *= i);
      });
      const i = n > 1 ? t.green : n < 1 ? t.red : "inherit";
      e.innerHTML = `\n    <span>Total multiplier: <span style="color: ${i};">x${Beautify(n, 1)}</span></span>\n  `;
    },
    C = `<span>Buffs: <span style="color: ${t.green};">visible</span> (Hide)</span>`,
    w = `<span>Buffs: <span style="color: ${t.red};">hidden</span> (Show)</span>`,
    k = (e, n, t) => {
      if (!n) return;
      const i = document.createElement("label");
      (t && Object.assign(i.style, t), (i.innerHTML = n), e.appendChild(i));
    },
    v = (e, n) => {
      "slider" === n.type
        ? ((e, n) => {
            const t = u[n.id],
              i = document.createElement("div");
            ((i.className = "sliderBox"), (i.style.width = "230px"));
            const a = document.createElement("div");
            ((a.style.float = "left"),
              (a.className = "smallFancyButton"),
              (a.innerHTML = n.name));
            const s = document.createElement("div");
            ((s.style.float = "right"),
              (s.className = "smallFancyButton"),
              (s.innerHTML = n.valueFormat(t)));
            const o = document.createElement("input");
            ((o.className = "slider"),
              (o.type = "range"),
              (o.min = String(n.min)),
              (o.max = String(n.max)),
              (o.step = String(n.step)),
              (o.value = String(void 0 !== t ? t : n.default)),
              i.appendChild(a),
              i.appendChild(s),
              i.appendChild(o));
            const r = (e) => {
              ((u[n.id] = +e),
                (s.innerHTML = n.valueFormat(+e)),
                n.onChange?.(+e));
            };
            ((i.onchange = () => {
              (r(o.value), PlaySound("snd/tick.mp3"));
            }),
              (i.oninput = () => {
                r(o.value);
              }),
              e.appendChild(i),
              k(e, n.description, {
                position: "relative",
                display: "inline-block",
                top: "-9px",
              }),
              e.appendChild(document.createElement("br")));
          })(e, n)
        : ((e, n) => {
            const t = u[n.id],
              i = document.createElement("a");
            (i.classList.add("smallFancyButton", "prefButton", "option"),
              t || i.classList.add("off"),
              (i.innerHTML = `${n.name} ${t ? "ON" : "OFF"}`),
              (i.onclick = () => {
                const e = !u[n.id];
                var t;
                ((t = e),
                  (u[n.id] = t),
                  (i.innerHTML = `${n.name} ${t ? "ON" : "OFF"}`),
                  i.classList.toggle("off", !t),
                  PlaySound("snd/tick.mp3"),
                  n.onChange?.(e));
              }),
              e.appendChild(i),
              k(e, n.description),
              e.appendChild(document.createElement("br")));
          })(e, n);
    },
    S = () => {
      const t = Math.max(1, u.updateFrequency);
      Game.drawT % Math.ceil(t / 2) === 0 &&
        ((() => {
          const t = Game.shimmerTypes.golden.minTime,
            i = Game.shimmerTypes.golden.maxTime,
            a = i - t,
            s = Game.shimmerTypes.golden.time,
            o = Math.max(0, s - t),
            l = Math.ceil((t - s) / Game.fps),
            d = `${l > 0 ? `${l}+` : ""}${Math.ceil(Math.min(a, i - s) / Game.fps)}s`,
            c =
              100 *
              (1 -
                Math.exp((-5 * (o / Game.fps) ** 5.93) / (a / Game.fps) ** 5)),
            f =
              ((m = n.red),
              (u = n.green),
              (p = Math.min(1, c / 50)),
              [0, 0, 0].map((e, n) => Math.round(m[n] * (1 - p) + u[n] * p)));
          var m, u, p;
          const g = r("GCTimer");
          g &&
            (e.natGCOnScreen
              ? (g.innerHTML = "<span>GC: On screen</span>")
              : (g.innerHTML = `<span>GC: ${d}</span> <span style="color: rgb(${f.toString()});">${c.toFixed(1)}%</span>`));
        })(),
        Game.drawT % t === 0 &&
          ((e.natGCOnScreen = Game.shimmers.some(
            (e) => "golden" === e.type && e.spawnLead,
          )),
          x(),
          T()));
    },
    _ = {
      init: () => {
        ((() => {
          const e = document.createElement("div");
          ((e.id = "QTContainer"),
            e.classList.add("qt_infoContainer"),
            l("sectionLeft")?.appendChild(e));
        })(),
          (() => {
            const n = Game.UpdateMenu;
            Game.UpdateMenu = () => {
              (n(),
                (() => {
                  if (!l("menu")?.childNodes?.length) return;
                  if ("prefs" !== Game.onMenu) return;
                  const e = document.createElement("div");
                  ((e.id = "QuickTimersModSettings"),
                    (e.className = "subsection"));
                  const n = document.createElement("div");
                  n.className = "title";
                  const t = document.createElement("span");
                  t.style.cssText =
                    "display:inline-flex;align-items:center;gap:12px;";
                  const i = document.createElement("span");
                  ((i.textContent = `${"QuickTimers".replace(/([a-z\d])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")} Settings`),
                    t.appendChild(i));
                  const a = document.createElement("a");
                  ((a.className = "smallFancyButton"),
                    (a.href = "#"),
                    (a.style.cssText = "flex-shrink:0;white-space:nowrap;"),
                    t.appendChild(a),
                    n.appendChild(t));
                  const s = document.createElement("div");
                  ((s.className = "listing"),
                    (s.id = "QuickTimersSettingsListing"),
                    a.setAttribute("aria-controls", s.id));
                  const o = () => {
                    ((s.hidden = u.collapseSettings),
                      (a.textContent = u.collapseSettings
                        ? "Expand"
                        : "Collapse"),
                      a.setAttribute(
                        "aria-expanded",
                        String(!u.collapseSettings),
                      ));
                  };
                  ((a.onclick = (e) => {
                    (e.preventDefault(),
                      (u.collapseSettings = !u.collapseSettings),
                      o());
                  }),
                    o(),
                    m.forEach((e, n) => {
                      (((e, n, t) => {
                        if (!t) {
                          const n = document.createElement("div");
                          n.className = "qt_settingsCategoryLine";
                          const t = document.createElement("div");
                          ((t.className = "line"),
                            n.appendChild(t),
                            e.appendChild(n));
                        }
                        const i = document.createElement("div");
                        ((i.className = "qt_settingsCategoryTitle"),
                          (i.innerHTML = `<b>${n}</b>`),
                          e.appendChild(i));
                      })(s, e.title, 0 === n),
                        e.options.forEach((e) => {
                          v(s, e);
                        }));
                    }),
                    e.appendChild(n),
                    e.appendChild(s),
                    l("menu")?.insertBefore(
                      e,
                      l("menu")?.childNodes[3] || null,
                    ));
                })());
            };
            const t = Game.LoadSave;
            Game.LoadSave = (n) => (
              e.buffTimers.forEach(({ id: e }) => {
                r(e)?.remove();
              }),
              (e.buffTimers = []),
              t(n)
            );
            const i = Game.gainBuff;
            Game.gainBuff = (...n) => {
              const t = e.buffTimers,
                a = i(...n);
              return (
                u.highlightExistingBuffs &&
                  ((e, n) => {
                    const t = p(n),
                      i = e.find((e) => e.id === t);
                    var a;
                    i &&
                      (a = r(i.id)) &&
                      (a.classList.add("qt_behind", "qt_highlighted"),
                      setTimeout(() => {
                        a.classList.remove("qt_highlighted");
                      }, 1e3),
                      setTimeout(() => {
                        a.classList.remove("qt_behind");
                      }, 1500));
                  })(t, a),
                a
              );
            };
            const a = document.createElement("style");
            ((a.id = "QTStyles"),
              (a.innerHTML =
                "\n  .qt_infoBlock {\n    position: relative;\n    z-index: 10;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    padding: 3px 6px;\n    background-color: rgba(0, 0, 0, 0.5);\n    border-radius: 5px;\n    transition-duration: 0.5s;\n    transition-property: box-shadow, color, background-color;\n  }\n\n  .qt_infoContainer {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    z-index: 1000;\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: center;\n    gap: 3px;\n    font-weight: bold;\n  }\n\n  .qt_altStacking {\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n  }\n\n  .qt_behind {\n    z-index: 5;\n  }\n\n  .qt_highlighted {\n    box-shadow: 0 0 15px 15px white !important;\n  }\n\n  .qt_infoContainer:not(.qt_warnOff) .qt_warning {\n    background-color: rgba(255, 42, 75, 0.55);\n    color: white;\n    animation: qt-warning-blink 1s infinite;\n  }\n\n  .qt_settingsCategoryLine {\n    text-align: center;\n    clear: both;\n    padding: 8px 0 2px;\n  }\n\n  .qt_settingsCategoryTitle {\n    clear: both;\n    padding: 2px 0 10px;\n    font-family: 'Merriweather', Georgia, serif;\n    font-size: 15px;\n  }\n\n  @keyframes qt-warning-blink {\n    0%, 100% {\n      box-shadow: 0 0 5px 2px rgba(255, 42, 75, 0.9);\n    }\n    50% {\n      box-shadow: 0 0 0 0 rgba(255, 42, 75, 0.9);\n    }\n  }\n"),
              document.head.appendChild(a));
          })(),
          (() => {
            const n = y("buffToggler");
            ((n.style.cursor = "pointer"),
              (n.style.transition = "background-color 0.5s"),
              (n.onmouseenter = () => {
                n.style.backgroundColor = "rgba(90, 90, 90, 0.5)";
              }),
              (n.onmouseleave = () => {
                n.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              }),
              (n.innerHTML = u.showBuffTimers ? C : w),
              (n.onclick = () => {
                ((u.showBuffTimers = !u.showBuffTimers),
                  (n.innerHTML = u.showBuffTimers ? C : w),
                  u.showBuffTimers
                    ? e.buffTimers.forEach((e) => {
                        y(e.id);
                      })
                    : e.buffTimers.forEach((e) => {
                        r(e.id)?.remove();
                      }));
              }));
          })(),
          y("GCTimer"),
          y("totalMult"),
          d(r("totalMult"), u.showTotalBuffMultiplier),
          x(),
          Game.registerHook("draw", S));
      },
      save: () => JSON.stringify(u),
      load: (e) => {
        const n = JSON.parse(e);
        (Object.keys(n).forEach((e) => {
          e in u && void 0 !== n[e] && (u[e] = n[e]);
        }),
          (() => {
            for (const e of m)
              for (const n of e.options)
                n.onChange && (n.type, n.onChange(u[n.id]));
            if (!u.showBuffTimers) {
              const e = l(o("buffToggler"));
              e && (e.innerHTML = w);
            }
          })());
      },
    };
  "undefined" != typeof Steam
    ? setTimeout(() => {
        Game.registerMod("QuickTimers", _);
      }, 2e3)
    : Game.registerMod("QuickTimers", _);
})();
//# sourceMappingURL=QuickTimers.js.map
