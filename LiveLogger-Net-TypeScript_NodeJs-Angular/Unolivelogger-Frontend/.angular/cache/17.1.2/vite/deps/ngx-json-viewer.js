import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-A4OB7DAN.js";
import {
  Component,
  Input,
  NgModule,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-OJAAXJTW.js";
import "./chunk-T2GM6OKO.js";
import "./chunk-4I3KGSMW.js";
import "./chunk-J4B6MK7R.js";

// node_modules/ngx-json-viewer/fesm2020/ngx-json-viewer.mjs
function NgxJsonViewerComponent_section_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 9);
  }
}
function NgxJsonViewerComponent_section_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 10);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const segment_r1 = ɵɵnextContext().$implicit;
    ɵɵadvance();
    ɵɵtextInterpolate(segment_r1.description);
  }
}
function NgxJsonViewerComponent_section_1_section_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "section", 11);
    ɵɵelement(1, "ngx-json-viewer", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const segment_r1 = ɵɵnextContext().$implicit;
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("json", segment_r1.value)("expanded", ctx_r4.expanded)("depth", ctx_r4.depth)("_currentDepth", ctx_r4._currentDepth + 1);
  }
}
var _c0 = (a1) => ["segment", a1];
var _c1 = (a1, a2) => ({
  "segment-main": true,
  "expandable": a1,
  "expanded": a2
});
function NgxJsonViewerComponent_section_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "section", 2)(1, "section", 3);
    ɵɵlistener("click", function NgxJsonViewerComponent_section_1_Template_section_click_1_listener() {
      const restoredCtx = ɵɵrestoreView(_r8);
      const segment_r1 = restoredCtx.$implicit;
      const ctx_r7 = ɵɵnextContext();
      return ɵɵresetView(ctx_r7.toggle(segment_r1));
    });
    ɵɵtemplate(2, NgxJsonViewerComponent_section_1_div_2_Template, 1, 0, "div", 4);
    ɵɵelementStart(3, "span", 5);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 6);
    ɵɵtext(6, ": ");
    ɵɵelementEnd();
    ɵɵtemplate(7, NgxJsonViewerComponent_section_1_span_7_Template, 2, 1, "span", 7);
    ɵɵelementEnd();
    ɵɵtemplate(8, NgxJsonViewerComponent_section_1_section_8_Template, 2, 4, "section", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const segment_r1 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c0, "segment-type-" + segment_r1.type));
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction2(8, _c1, ctx_r0.isExpandable(segment_r1), segment_r1.expanded));
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.isExpandable(segment_r1));
    ɵɵadvance(2);
    ɵɵtextInterpolate(segment_r1.key);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", !segment_r1.expanded || !ctx_r0.isExpandable(segment_r1));
    ɵɵadvance();
    ɵɵproperty("ngIf", segment_r1.expanded && ctx_r0.isExpandable(segment_r1));
  }
}
var NgxJsonViewerComponent = class {
  constructor() {
    this.expanded = true;
    this.depth = -1;
    this._currentDepth = 0;
    this.segments = [];
  }
  ngOnChanges() {
    this.segments = [];
    this.json = this.decycle(this.json);
    if (typeof this.json === "object") {
      Object.keys(this.json).forEach((key) => {
        this.segments.push(this.parseKeyValue(key, this.json[key]));
      });
    } else {
      this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
    }
  }
  isExpandable(segment) {
    return segment.type === "object" || segment.type === "array";
  }
  toggle(segment) {
    if (this.isExpandable(segment)) {
      segment.expanded = !segment.expanded;
    }
  }
  parseKeyValue(key, value) {
    const segment = {
      key,
      value,
      type: void 0,
      description: "" + value,
      expanded: this.isExpanded()
    };
    switch (typeof segment.value) {
      case "number": {
        segment.type = "number";
        break;
      }
      case "boolean": {
        segment.type = "boolean";
        break;
      }
      case "function": {
        segment.type = "function";
        break;
      }
      case "string": {
        segment.type = "string";
        segment.description = '"' + segment.value + '"';
        break;
      }
      case "undefined": {
        segment.type = "undefined";
        segment.description = "undefined";
        break;
      }
      case "object": {
        if (segment.value === null) {
          segment.type = "null";
          segment.description = "null";
        } else if (Array.isArray(segment.value)) {
          segment.type = "array";
          segment.description = "Array[" + segment.value.length + "] " + JSON.stringify(segment.value);
        } else if (segment.value instanceof Date) {
          segment.type = "date";
        } else {
          segment.type = "object";
          segment.description = "Object " + JSON.stringify(segment.value);
        }
        break;
      }
    }
    return segment;
  }
  isExpanded() {
    return this.expanded && !(this.depth > -1 && this._currentDepth >= this.depth);
  }
  // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
  decycle(object) {
    const objects = /* @__PURE__ */ new WeakMap();
    return function derez(value, path) {
      let old_path;
      let nu;
      if (typeof value === "object" && value !== null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String)) {
        old_path = objects.get(value);
        if (old_path !== void 0) {
          return {
            $ref: old_path
          };
        }
        objects.set(value, path);
        if (Array.isArray(value)) {
          nu = [];
          value.forEach(function(element, i) {
            nu[i] = derez(element, path + "[" + i + "]");
          });
        } else {
          nu = {};
          Object.keys(value).forEach(function(name) {
            nu[name] = derez(value[name], path + "[" + JSON.stringify(name) + "]");
          });
        }
        return nu;
      }
      return value;
    }(object, "$");
  }
};
NgxJsonViewerComponent.ɵfac = function NgxJsonViewerComponent_Factory(t) {
  return new (t || NgxJsonViewerComponent)();
};
NgxJsonViewerComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxJsonViewerComponent,
  selectors: [["ngx-json-viewer"]],
  inputs: {
    json: "json",
    expanded: "expanded",
    depth: "depth",
    _currentDepth: "_currentDepth"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 2,
  vars: 1,
  consts: [[1, "ngx-json-viewer"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], [3, "ngClass", "click"], ["class", "toggler", 4, "ngIf"], [1, "segment-key"], [1, "segment-separator"], ["class", "segment-value", 4, "ngIf"], ["class", "children", 4, "ngIf"], [1, "toggler"], [1, "segment-value"], [1, "children"], [3, "json", "expanded", "depth", "_currentDepth"]],
  template: function NgxJsonViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "section", 0);
      ɵɵtemplate(1, NgxJsonViewerComponent_section_1_Template, 9, 11, "section", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.segments);
    }
  },
  dependencies: [NgClass, NgForOf, NgIf, NgxJsonViewerComponent],
  styles: ['@charset "UTF-8";.ngx-json-viewer[_ngcontent-%COMP%]{font-family:var(--ngx-json-font-family, monospace);font-size:var(--ngx-json-font-size, 1em);width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]{padding:2px;margin:1px 1px 1px 12px}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]{word-wrap:break-word}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:var(--ngx-json-toggler, #787878)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .toggler[_ngcontent-%COMP%]:after{display:inline-block;content:"\\25ba";transition:transform .1s ease-in}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-key[_ngcontent-%COMP%]{color:var(--ngx-json-key, #4E187C)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-separator[_ngcontent-%COMP%]{color:var(--ngx-json-separator, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .segment-main[_ngcontent-%COMP%]   .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-value, #000)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment[_ngcontent-%COMP%]   .children[_ngcontent-%COMP%]{margin-left:12px}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-string[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-string, #FF6B6B)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-number[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-number, #009688)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-boolean[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-boolean, #B938A4)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-date[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-date, #05668D)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-array[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-array, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-object[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-object, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-function[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-function, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-null[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-null, #fff)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{color:var(--ngx-json-undefined, #fff)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-null[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{background-color:var(--ngx-json-null-bg, red)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-key[_ngcontent-%COMP%]{color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-undefined[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%] > .segment-value[_ngcontent-%COMP%]{background-color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-object[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%], .ngx-json-viewer[_ngcontent-%COMP%]   .segment-type-array[_ngcontent-%COMP%] > .segment-main[_ngcontent-%COMP%]{white-space:nowrap}.ngx-json-viewer[_ngcontent-%COMP%]   .expanded[_ngcontent-%COMP%] > .toggler[_ngcontent-%COMP%]:after{transform:rotate(90deg)}.ngx-json-viewer[_ngcontent-%COMP%]   .expandable[_ngcontent-%COMP%], .ngx-json-viewer[_ngcontent-%COMP%]   .expandable[_ngcontent-%COMP%] > .toggler[_ngcontent-%COMP%]{cursor:pointer}']
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxJsonViewerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-json-viewer",
      template: `<section class="ngx-json-viewer">
  <section
    *ngFor="let segment of segments"
    [ngClass]="['segment', 'segment-type-' + segment.type]">
    <section
      (click)="toggle(segment)"
      [ngClass]="{
        'segment-main': true,
        'expandable': isExpandable(segment),
        'expanded': segment.expanded
      }">
      <div *ngIf="isExpandable(segment)" class="toggler"></div>
      <span class="segment-key">{{ segment.key }}</span>
      <span class="segment-separator">: </span>
      <span *ngIf="!segment.expanded || !isExpandable(segment)" class="segment-value">{{ segment.description }}</span>
    </section>
    <section *ngIf="segment.expanded && isExpandable(segment)" class="children">
      <ngx-json-viewer [json]="segment.value" [expanded]="expanded" [depth]="depth" [_currentDepth]="_currentDepth+1"></ngx-json-viewer>
    </section>
  </section>
</section>
`,
      styles: ['@charset "UTF-8";.ngx-json-viewer{font-family:var(--ngx-json-font-family, monospace);font-size:var(--ngx-json-font-size, 1em);width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer .segment{padding:2px;margin:1px 1px 1px 12px}.ngx-json-viewer .segment .segment-main{word-wrap:break-word}.ngx-json-viewer .segment .segment-main .toggler{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:var(--ngx-json-toggler, #787878)}.ngx-json-viewer .segment .segment-main .toggler:after{display:inline-block;content:"\\25ba";transition:transform .1s ease-in}.ngx-json-viewer .segment .segment-main .segment-key{color:var(--ngx-json-key, #4E187C)}.ngx-json-viewer .segment .segment-main .segment-separator{color:var(--ngx-json-separator, #999)}.ngx-json-viewer .segment .segment-main .segment-value{color:var(--ngx-json-value, #000)}.ngx-json-viewer .segment .children{margin-left:12px}.ngx-json-viewer .segment-type-string>.segment-main>.segment-value{color:var(--ngx-json-string, #FF6B6B)}.ngx-json-viewer .segment-type-number>.segment-main>.segment-value{color:var(--ngx-json-number, #009688)}.ngx-json-viewer .segment-type-boolean>.segment-main>.segment-value{color:var(--ngx-json-boolean, #B938A4)}.ngx-json-viewer .segment-type-date>.segment-main>.segment-value{color:var(--ngx-json-date, #05668D)}.ngx-json-viewer .segment-type-array>.segment-main>.segment-value{color:var(--ngx-json-array, #999)}.ngx-json-viewer .segment-type-object>.segment-main>.segment-value{color:var(--ngx-json-object, #999)}.ngx-json-viewer .segment-type-function>.segment-main>.segment-value{color:var(--ngx-json-function, #999)}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{color:var(--ngx-json-null, #fff)}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{color:var(--ngx-json-undefined, #fff)}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{background-color:var(--ngx-json-null-bg, red)}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-key{color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{background-color:var(--ngx-json-undefined-key, #999)}.ngx-json-viewer .segment-type-object>.segment-main,.ngx-json-viewer .segment-type-array>.segment-main{white-space:nowrap}.ngx-json-viewer .expanded>.toggler:after{transform:rotate(90deg)}.ngx-json-viewer .expandable,.ngx-json-viewer .expandable>.toggler{cursor:pointer}\n']
    }]
  }], null, {
    json: [{
      type: Input
    }],
    expanded: [{
      type: Input
    }],
    depth: [{
      type: Input
    }],
    _currentDepth: [{
      type: Input
    }]
  });
})();
var NgxJsonViewerModule = class {
};
NgxJsonViewerModule.ɵfac = function NgxJsonViewerModule_Factory(t) {
  return new (t || NgxJsonViewerModule)();
};
NgxJsonViewerModule.ɵmod = ɵɵdefineNgModule({
  type: NgxJsonViewerModule,
  declarations: [NgxJsonViewerComponent],
  imports: [CommonModule],
  exports: [NgxJsonViewerComponent]
});
NgxJsonViewerModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxJsonViewerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NgxJsonViewerComponent],
      exports: [NgxJsonViewerComponent]
    }]
  }], null, null);
})();
export {
  NgxJsonViewerComponent,
  NgxJsonViewerModule
};
//# sourceMappingURL=ngx-json-viewer.js.map
