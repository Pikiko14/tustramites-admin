(this["webpackJsonptu-experto-lega-admin"]=this["webpackJsonptu-experto-lega-admin"]||[]).push([[10],{109:function(e,t,a){"use strict";var n=a(77),r=a(0),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},c=a(81),l=function(e,t){return r.createElement(c.a,Object(n.a)(Object(n.a)({},e),{},{ref:t,icon:s}))},i=r.forwardRef(l);t.a=i},138:function(e,t,a){"use strict";var n=a(139),r=a(20);function s(e,t){return t.encode?t.strict?n(e):encodeURIComponent(e):e}function c(e){return Array.isArray(e)?e.sort():"object"===typeof e?c(Object.keys(e)).sort((function(e,t){return Number(e)-Number(t)})).map((function(t){return e[t]})):e}t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){var a=function(e){var t;switch(e.arrayFormat){case"index":return function(e,a,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=a):n[e]=a};case"bracket":return function(e,a,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],a):n[e]=[a]:n[e]=a};default:return function(e,t,a){void 0!==a[e]?a[e]=[].concat(a[e],t):a[e]=t}}}(t=r({arrayFormat:"none"},t)),n=Object.create(null);return"string"!==typeof e?n:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach((function(e){var t=e.replace(/\+/g," ").split("="),r=t.shift(),s=t.length>0?t.join("="):void 0;s=void 0===s?null:decodeURIComponent(s),a(decodeURIComponent(r),s,n)})),Object.keys(n).sort().reduce((function(e,t){var a=n[t];return Boolean(a)&&"object"===typeof a&&!Array.isArray(a)?e[t]=c(a):e[t]=a,e}),Object.create(null))):n},t.stringify=function(e,t){var a=function(e){switch(e.arrayFormat){case"index":return function(t,a,n){return null===a?[s(t,e),"[",n,"]"].join(""):[s(t,e),"[",s(n,e),"]=",s(a,e)].join("")};case"bracket":return function(t,a){return null===a?s(t,e):[s(t,e),"[]=",s(a,e)].join("")};default:return function(t,a){return null===a?s(t,e):[s(t,e),"=",s(a,e)].join("")}}}(t=r({encode:!0,strict:!0,arrayFormat:"none"},t));return e?Object.keys(e).sort().map((function(n){var r=e[n];if(void 0===r)return"";if(null===r)return s(n,t);if(Array.isArray(r)){var c=[];return r.slice().forEach((function(e){void 0!==e&&c.push(a(n,e,c.length))})),c.join("&")}return s(n,t)+"="+s(r,t)})).filter((function(e){return e.length>0})).join("&"):""}},139:function(e,t,a){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}},561:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(554),s=a(535),c=a(553),l=a(146),i=a(138),o=a.n(i),d=a(15),u=a(90),m=a(308),j=a(1);var b=e=>{let{form:t,TextArea:a}=e;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(r.a.Item,{label:"N\xfamero",name:"key",id:"key",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el n\xfamero!"},{min:1,message:"El n\xfamero debe tener al menos 1 digito!"},{max:2,message:"El n\xfamero debe tener m\xe1ximo 2 digitos!"}],children:Object(j.jsx)(s.a,{type:"number",placeholder:"Ingrese el n\xfamero de la opci\xf3n del chatbot"})}),Object(j.jsx)(r.a.Item,{label:"T\xedtulo",name:"title",id:"title",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el titulo!"},{min:4,message:"El titulo debe tener al menos 4 caracteres!"},{max:80,message:"El titulo debe tener maximo 80 caracteres!"}],children:Object(j.jsx)(s.a,{placeholder:"Ingrese el t\xedtulo de la opci\xf3n del chatbot"})}),Object(j.jsx)(r.a.Item,{label:"Descripci\xf3n",name:"description",id:"description",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese la descripci\xf3n!"},{min:10,message:"La descripci\xf3n debe tener al menos 10 caracteres!"}],children:Object(j.jsx)(a,{placeholder:"Ingrese una descripci\xf3n",rows:2,autoSize:{minRows:1,maxRows:3},maxLength:400,showCount:!0})}),Object(j.jsx)(r.a.Item,{name:"whatsapp",valuePropName:"checked",id:"whatsapp",children:Object(j.jsx)(m.a,{children:"\xbfComunicaci\xf3n por whatsapp?"})}),Object(j.jsx)(r.a.Item,{name:"state",valuePropName:"checked",id:"state",children:Object(j.jsx)(m.a,{children:"\xbfActivo?"})})]})},h=a(89),p=a(91),O=a(87);var f=e=>{let{secondLevel:t,setSecondLevel:a,TextArea:c,thirthLevel:i}=e;const[o]=r.a.useForm(),[d,u]=Object(n.useState)(!1),b=[{title:"N\xfamero",dataIndex:"key",key:"key",render:e=>Object(j.jsx)("a",{children:e})},{title:"Titulo",dataIndex:"title",key:"title",render:e=>Object(j.jsx)("a",{children:e})},{title:"Descripci\xf3n",dataIndex:"description",key:"description",render:e=>Object(j.jsx)("a",{children:e})},{title:"\xbfChat en Whatsapp?",dataIndex:"whatsapp",key:"whatsapp",render:e=>Object(j.jsx)("a",{children:e?"Si":"No"})},{title:"Estado",dataIndex:"state",key:"state",render:e=>Object(j.jsx)("a",{children:e?"Activo":"Inactivo"})},{title:"Acci\xf3n",dataIndex:"action",key:"action",render:(e,t)=>Object(j.jsx)(p.a,{handleEdit:()=>f(t,"edit"),handleDelete:()=>f(t,"delete")})}],f=async(e,n)=>{let r=[...t],s=999999;for(let t=0;t<r.length;t++)if(r[t].title==e.title){s=t;break}if("edit"==n){let t={key:e.key,title:e.title,description:e.description,whatsapp:e.whatsapp,state:e.state};u(!0),o.setFieldsValue(t)}if("delete"==n){i.find((t=>t.secondLevel==e.title))?O.a.show({type:"error",title:"Error",message:"Elemento no puede ser eliminado, ya que se encuentra asociado en la data de tercer nivel.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"}):(r.splice(s,1),a(r))}};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(r.a,{form:o,layout:"vertical",children:Object(j.jsxs)(r.a.Item,{style:{display:"flex"},children:[Object(j.jsx)(r.a.Item,{label:"N\xfamero",name:"key",id:"key",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el n\xfamero!"},{min:1,message:"El n\xfamero debe tener al menos 1 digito!"},{max:2,message:"El n\xfamero debe tener m\xe1ximo 2 digitos!"}],children:Object(j.jsx)(s.a,{type:"number",placeholder:"Ingrese el n\xfamero de la opci\xf3n del chatbot",disabled:d})}),Object(j.jsx)(r.a.Item,{label:"T\xedtulo",name:"title",id:"title",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el titulo!"},{min:4,message:"El titulo debe tener al menos 4 caracteres!"},{max:80,message:"El titulo debe tener maximo 80 caracteres!"}],children:Object(j.jsx)(s.a,{placeholder:"Ingrese el t\xedtulo de la opci\xf3n del chatbot"})}),Object(j.jsx)(r.a.Item,{label:"Descripci\xf3n",name:"description",id:"description",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese la descripci\xf3n!"},{min:10,message:"La descripci\xf3n debe tener al menos 10 caracteres!"}],children:Object(j.jsx)(c,{placeholder:"Ingrese una descripci\xf3n",rows:2,autoSize:{minRows:1,maxRows:3},maxLength:400,showCount:!0})}),Object(j.jsx)(r.a.Item,{name:"whatsapp",valuePropName:"checked",id:"whatsapp",children:Object(j.jsx)(m.a,{children:"\xbfComunicaci\xf3n por whatsapp?"})}),Object(j.jsx)(r.a.Item,{name:"state",valuePropName:"checked",id:"state",children:Object(j.jsx)(m.a,{children:"\xbfActivo?"})}),Object(j.jsx)(l.a,{onClick:()=>(()=>{let e,n=o.getFieldValue("key"),r=o.getFieldValue("title"),s=o.getFieldValue("description"),c=o.getFieldValue("whatsapp")||!1,l=o.getFieldValue("state")||!1;if(""!=n&&""!=r&&""!=s){let i=[...t],m={key:n,title:r,description:s,whatsapp:c,state:l};if(d){let e=999999;for(let t=0;t<i.length;t++)if(i[t].title==r){e=t;break}i[e]=m}else e=t.find((e=>e.key==n)),e?O.a.show({type:"error",title:"Error",message:"Elemento no puede ser a\xf1adido, ya se encuentra una opci\xf3n con ese n\xfamero.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"}):i.push(m);e||(a(i),m={key:"",title:"",description:"",whatsapp:!1,state:!1},o.setFieldsValue(m),u(!1))}})(),children:" Agregar"})]})}),Object(j.jsx)("div",{className:"main-card-table",children:Object(j.jsx)(h.a,{columns:b,data:t})})]})},x=a(539);var g=e=>{let{secondLevel:t,thirthLevel:a,setThirthLevel:c,TextArea:i}=e;const[o]=r.a.useForm(),[d,u]=Object(n.useState)(!1),b=[{title:"N\xfamero",dataIndex:"key",key:"key",render:e=>Object(j.jsx)("a",{children:e})},{title:"Titulo",dataIndex:"title",key:"title",render:e=>Object(j.jsx)("a",{children:e})},{title:"Descripci\xf3n",dataIndex:"description",key:"description",render:e=>Object(j.jsx)("a",{children:e})},{title:"Segundo Nivel",dataIndex:"secondLevel",key:"secondLevel",render:e=>Object(j.jsx)("a",{children:e})},{title:"\xbfChat en Whatsapp?",dataIndex:"whatsapp",key:"whatsapp",render:e=>Object(j.jsx)("a",{children:e?"Si":"No"})},{title:"Estado",dataIndex:"state",key:"state",render:e=>Object(j.jsx)("a",{children:e?"Activo":"Inactivo"})},{title:"Acci\xf3n",dataIndex:"action",key:"action",render:(e,t)=>Object(j.jsx)(p.a,{handleEdit:()=>f(t,"edit"),handleDelete:()=>f(t,"delete")})}],f=async(e,t)=>{let n=[...a],r=999999;for(let a=0;a<n.length;a++)if(n[a].title==e.title){r=a;break}if("edit"==t){let t={key:e.key,title:e.title,description:e.description,secondLevel:e.secondLevel,whatsapp:e.whatsapp,state:e.state};u(!0),o.setFieldsValue(t)}"delete"==t&&(n.splice(r,1),c(n))};return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(r.a,{form:o,layout:"vertical",children:Object(j.jsxs)(r.a.Item,{style:{display:"flex"},children:[Object(j.jsx)(r.a.Item,{label:"N\xfamero",name:"key",id:"key",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el n\xfamero!"},{min:1,message:"El n\xfamero debe tener al menos 1 digito!"},{max:2,message:"El n\xfamero debe tener m\xe1ximo 2 digitos!"}],children:Object(j.jsx)(s.a,{type:"number",placeholder:"Ingrese el n\xfamero de la opci\xf3n del chatbot",disabled:d})}),Object(j.jsx)(r.a.Item,{label:"T\xedtulo",name:"title",id:"title",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el titulo!"},{min:4,message:"El titulo debe tener al menos 4 caracteres!"},{max:80,message:"El titulo debe tener maximo 80 caracteres!"}],children:Object(j.jsx)(s.a,{placeholder:"Ingrese el t\xedtulo de la opci\xf3n del chatbot"})}),Object(j.jsx)(r.a.Item,{label:"Descripci\xf3n",name:"description",id:"description",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese la descripci\xf3n!"},{min:10,message:"La descripci\xf3n debe tener al menos 10 caracteres!"}],children:Object(j.jsx)(i,{placeholder:"Ingrese una descripci\xf3n",rows:2,autoSize:{minRows:1,maxRows:3},maxLength:400,showCount:!0})}),Object(j.jsx)(r.a.Item,{name:"secondLevel",id:"secondLevel",label:"Segundo nivel",rules:[{required:!0}],children:Object(j.jsx)(x.a,{placeholder:"Seleccione una opci\xf3n",allowClear:!0,hasFeedback:!0,children:t.map(((e,t)=>Object(j.jsx)("option",{value:e.title,children:e.title},t)))})}),Object(j.jsx)(r.a.Item,{name:"whatsapp",valuePropName:"checked",id:"whatsapp",children:Object(j.jsx)(m.a,{children:"\xbfComunicaci\xf3n por whatsapp?"})}),Object(j.jsx)(r.a.Item,{name:"state",valuePropName:"checked",id:"state",children:Object(j.jsx)(m.a,{children:"\xbfActivo?"})}),Object(j.jsx)(l.a,{onClick:()=>(()=>{let e,t=o.getFieldValue("key"),n=o.getFieldValue("title"),r=o.getFieldValue("description"),s=o.getFieldValue("secondLevel"),l=o.getFieldValue("whatsapp")||!1,i=o.getFieldValue("state")||!1;if(""!=t&&""!=n&&""!=r&&s){let m=[...a],j={key:t,title:n,description:r,secondLevel:s,whatsapp:l,state:i};if(d){let e=999999;for(let t=0;t<m.length;t++)if(m[t].title==n){e=t;break}m[e]=j}else e=a.find((e=>e.key==t&&e.secondLevel==s)),e?O.a.show({type:"error",title:"Error",message:"Elemento no puede ser a\xf1adido, ya se encuentra una opci\xf3n con ese n\xfamero.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"}):m.push(j);e||(c(m),j={key:"",title:"",description:"",secondLevel:"",whatsapp:!1,state:!1},o.setFieldsValue(j),u(!1))}})(),children:" Agregar"})]})}),Object(j.jsx)("div",{className:"main-card-table",children:Object(j.jsx)(h.a,{columns:b,data:a})})]})};t.default=e=>{const[t,a]=Object(n.useState)(),[i]=r.a.useForm(),{TextArea:m}=s.a,[h,p]=Object(n.useState)([]),[x,v]=Object(n.useState)([]),{TabPane:y}=c.a,k=()=>{e.history.push("/chatbot")};Object(n.useEffect)((()=>{i.resetFields();let{id:t}=o.a.parse(e.location.search);t&&(async e=>{const t=await d.a.get("/api/chatbot/"+e);if(200==t.status){a(t.data);let e={key:t.data.key,title:t.data.title,description:t.data.description,whatsapp:t.data.whatsapp,state:t.data.state};i.setFieldsValue(e);let n=t.data.secondLevel,r=[];n.forEach((e=>{e.sons.forEach((e=>{r.push(e)}))})),v(r),delete n.sons,p(n)}})(t)}),[]);return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(u.a,{children:Object(j.jsxs)("div",{className:"header-page",children:[Object(j.jsx)("h1",{children:"Chatbot"}),Object(j.jsxs)("div",{className:"main-card card",children:[Object(j.jsx)("div",{className:"main-card-action",children:Object(j.jsxs)("ul",{children:[Object(j.jsx)("li",{children:Object(j.jsx)(l.a,{type:"primary",onClick:async()=>{let e=i.getFieldValue("key"),a=i.getFieldValue("title"),n=i.getFieldValue("description"),r=i.getFieldValue("whatsapp"),s=i.getFieldValue("state");if(""!=e&&""!=a||""!=n){if(x.length>0){let e=[...h],t=[...x];e.map((e=>(e.sons=t.filter((t=>t.secondLevel==e.title)),e))),p(e)}else{let e=[...h];e.map((e=>(e.sons=[],e))),p(e)}let c={key:e,title:a,description:n,secondLevel:h,whatsapp:r||!1,state:s||!1};if(t){200==(await d.a.put("/api/chatbot/"+t._id,c)).status&&(i.setFieldsValue(null),k())}else d.a.post("/api/chatbot/",c).then((e=>{i.setFieldsValue(null),k()})).catch((e=>{O.a.show({type:"error",title:"Error",message:"N\xfamero de la opci\xf3n del chatbot ya existe.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"})}))}else O.a.show({type:"error",title:"Advertencia",message:"Debe registrar al menos el n\xfamero,nombre y descripci\xf3n, para crear la opci\xf3n del chatbot",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"})},children:"Guardar"},"submit")}),Object(j.jsx)("li",{children:Object(j.jsx)(l.a,{href:"/chatbot",children:"Regresar"})})]})}),Object(j.jsx)("div",{className:"main-card",children:Object(j.jsx)(r.a,{form:i,layout:"vertical",children:Object(j.jsxs)(c.a,{defaultActiveKey:"1",children:[Object(j.jsx)(y,{tab:"1. Primer nivel",children:Object(j.jsx)(b,{form:i,TextArea:m})},"1"),Object(j.jsx)(y,{tab:"2. Segundo Nivel",children:Object(j.jsx)(f,{secondLevel:h,setSecondLevel:p,TextArea:m,thirthLevel:x})},"2"),Object(j.jsx)(y,{tab:"3. Tercer Nivel",children:Object(j.jsx)(g,{secondLevel:h,thirthLevel:x,setThirthLevel:v,TextArea:m})},"5")]})})})]})]})})})}},87:function(e,t,a){"use strict";a(0);var n=a(92),r=(a(93),a(1));const s={show(e){Object(n.confirmAlert)({closeOnClickOutside:!1,customUI:t=>{let{onClose:a}=t;return Object(r.jsx)("div",{className:"modal-alert",children:Object(r.jsx)("div",{className:"modal-content "+e.type,children:Object(r.jsxs)("div",{className:"content",children:[Object(r.jsxs)("div",{className:"alert-content",children:[Object(r.jsx)("p",{className:"alert-title",children:e.title}),Object(r.jsx)("p",{className:"alert-message",children:e.message})]}),Object(r.jsxs)("div",{className:"alert-buttons",children:[Object(r.jsx)("button",{type:"submit",className:"btn-large",onClick:()=>(a(),e.fnOk()),children:e.btnOk}),e.fnCancel?Object(r.jsx)("button",{type:"submit",className:"btn-large outline",onClick:()=>(a(),e.fnCancel()),children:e.btnCancel}):null]})]})})})}})}};t.a=s},88:function(e,t,a){"use strict";var n=a(0),r=a(536),s=a(15),c=a(554),l=a(146),i=a(535),o=a(539),d=a(552),u=a(99),m=a(1);t.a=e=>{let{user:t,data:a,setData:j,callback:b}=e;const[h]=c.a.useForm(),[p,O]=Object(n.useState)([]),f=()=>{const e=new FormData;t?(p.length>0&&e.append("image",p[0].originFileObj),e.append("user",JSON.stringify({first_name:h.getFieldValue("first_name"),last_name:h.getFieldValue("last_name"),email:h.getFieldValue("email"),password:h.getFieldValue("password"),role:h.getFieldValue("role"),url_image:""})),s.a.put("/api/user/"+(t._id?t._id:t.id),e).then((e=>{j(null),b(t._id?t._id:t.id)}))):(p.length>0&&e.append("image",p[0].originFileObj),e.append("user",JSON.stringify({first_name:h.getFieldValue("first_name"),last_name:h.getFieldValue("last_name"),email:h.getFieldValue("email"),password:h.getFieldValue("password"),role:h.getFieldValue("role"),url_image:""})),s.a.post("/api/user",e).then((e=>{j(null),b()})))},x=()=>{j(null)};return Object(n.useEffect)((()=>{if(h.resetFields(),t){let e={first_name:t.first_name,last_name:t.last_name,password:t.password,email:t.email,role:t.role};if(h.setFieldsValue(e),t.url_image){let e=t.url_image;O([{uid:"-1",name:"load.png",status:"done",url:e,thumbUrl:e}])}}else O([])}),[t,a]),Object(m.jsx)(r.a,{visible:a,title:"Informaci\xf3n del usuario",onOk:f,onCancel:x,forceRender:!0,maskClosable:!1,footer:[Object(m.jsx)(l.a,{onClick:x,children:"Cancelar"},"back"),Object(m.jsx)(l.a,{type:"primary",onClick:f,children:"Guardar"},"submit")],children:Object(m.jsxs)(c.a,{layout:"vertical",form:h,children:[Object(m.jsx)(c.a.Item,{label:"Nombre(s)",name:"first_name",id:"first_name",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el (los) nombre(s)!"},{min:4,message:"El (Los) nombre(s) debe(n) tener al menos 3 caracteres!"}],children:Object(m.jsx)(i.a,{})}),Object(m.jsx)(c.a.Item,{label:"Apellidos",name:"last_name",id:"last_name",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese los apellidos!"},{min:4,message:"Los apellidos deben tener al menos 4 caracteres!"}],children:Object(m.jsx)(i.a,{})}),Object(m.jsx)(c.a.Item,{label:"Correo",name:"email",id:"email",hasFeedback:!0,rules:[{required:!0,type:"email",message:"El valor ingresado no es un correo el\xe9ctronico!"}],children:Object(m.jsx)(i.a,{})}),Object(m.jsx)(c.a.Item,{label:"Contrase\xf1a",name:"password",id:"password",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese la contrase\xf1a!"},{min:8,message:"La contrase\xf1a debe tener al menos 8 caracteres!"}],children:Object(m.jsx)(i.a,{type:"password"})}),Object(m.jsx)(c.a.Item,{name:"role",id:"role",label:"Rol",rules:[{required:!0}],children:Object(m.jsxs)(o.a,{placeholder:"Seleccione un rol",allowClear:!0,children:[Object(m.jsx)("option",{value:"ADMINISTRADOR",children:"ADMINISTRADOR"}),Object(m.jsx)("option",{value:"ASESOR LEGAL",children:"ASESOR LEGAL"}),Object(m.jsx)("option",{value:"CALL CENTER",children:"CALL CENTER"})]})}),Object(m.jsx)(u.a,{rotate:!1,aspect:1,modalTitle:"Editar Imagen",children:Object(m.jsx)(d.a,{listType:"picture-card",fileList:p,defaultFileList:[...p],onChange:e=>{O(e.fileList)},children:0==p.length&&"+ Upload"})})]})})}},89:function(e,t,a){"use strict";a(0);var n=a(551),r=a(1);t.a=e=>{let{columns:t,data:a}=e;return Object(r.jsx)(n.a,{columns:t,dataSource:a})}},90:function(e,t,a){"use strict";var n=a(0),r=a(557),s=a(3),c=a(16),l=a(303),i=a.p+"static/media/tutorial.5db87431.pdf",o=a(576),d=a(577),u=a(578),m=a(579),j=a(580),b=a(581),h=a(582),p=a(583),O=a(584),f=a(585),x=a(586),g=a(11),v=a(1);new g.a;const{SubMenu:y}=l.a;var k=()=>{const e=Object(s.g)(),{user:t}=Object(n.useContext)(c.a);return Object(v.jsxs)("div",{className:"drawer",children:[Object(v.jsx)("div",{className:"drawer-logo",children:Object(v.jsx)("img",{src:"/assets/logo/logo-white.svg"})}),Object(v.jsx)("nav",{children:Object(v.jsx)(v.Fragment,{children:t&&"ADMINISTRADOR"===t.role?Object(v.jsxs)(l.a,{mode:"inline",defaultSelectedKeys:[e.location.pathname],defaultOpenKeys:[e.location.pathname.split("/")[1]],style:{height:"100%",borderRight:0},children:[Object(v.jsx)("div",{className:"menu-title",children:Object(v.jsx)("p",{children:"PANEL DE CONTROL"})}),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(o.a,{}),children:"Inicio"},"/"),Object(v.jsx)("div",{className:"menu-title",children:Object(v.jsx)("p",{children:"TR\xc1MITES"})}),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(d.a,{}),onClick:()=>e.push("/"),children:"Mis tr\xe1mites"},"10"),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(u.a,{}),onClick:()=>e.push("/notary"),children:"Notarias"},"/notary"),Object(v.jsxs)(y,{icon:Object(v.jsx)(m.a,{}),title:"Actos Notariales",children:[Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/notarial-act/view"),children:"\xb7 Lista de Actos Notariales"},"/notarial-act/view"),Object(v.jsxs)(y,{icon:Object(v.jsx)(m.a,{}),title:"Creaci\xf3n Acto Notarial",children:[Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/notarial-act/category"),children:"1\xb7 Categor\xedas"},"/notarial-act/category"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/notarial-act/actor"),children:"2\xb7 Actores"},"/notarial-act/actor"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/notarial-act/input"),children:"3\xb7 Campos Formularios"},"/notarial-act/input"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/notarial-act/form"),children:"4\xb7 Nuevo Acto Notarial"},"/notarial-act/form")]},"seb-notarial-act"),Object(v.jsxs)(l.a.Item,{children:[Object(v.jsx)("a",{href:i,target:"_blank"}),"\xbfNecesitas ayuda?"]},"/notarial-act/tutorial")]},"notarial-act"),Object(v.jsx)("div",{className:"menu-title",children:Object(v.jsx)("p",{children:"CONFIGURACI\xd3N"})}),Object(v.jsxs)(y,{icon:Object(v.jsx)(j.a,{}),title:"Web Site",children:[Object(v.jsxs)(y,{icon:Object(v.jsx)(b.a,{}),title:"Crear Pregunta",children:[Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/categoryquestion"),children:"\xb7 Categor\xedas Pregunta"},"/website/categoryquestion"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/subcategoryquestion"),children:"\xb7 Subcategor\xedas Pregunta"},"/website/subcategoryquestion"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/question"),children:"\xb7 Preguntas frecuentes"},"/website/question")]},"seb-question"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/banner"),children:"\xb7 Banner"},"/website/banner"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/internationalization"),children:"\xb7 Internacionalizaci\xf3n"},"/website/internationalization"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/page"),children:"\xb7 Politicas y tratamiento de datos"},"/website/page"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/contact"),children:"\xb7 Solicitudes de contacto"},"/website/contact"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/comment"),children:"\xb7 Comentarios"},"/website/comment")]},"website"),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(h.a,{}),onClick:()=>e.push("/user"),children:"Usuarios"},"/user"),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(p.a,{}),onClick:()=>e.push("/chatbot"),children:"Chatbot"},"/chatbot"),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(O.a,{}),onClick:()=>e.push("/aditional-config"),children:"Configuraci\xf3n adicional"},"/aditional-config"),Object(v.jsx)(l.a.Item,{icon:Object(v.jsx)(f.a,{}),onClick:()=>e.push("/notification"),children:"Notificaciones"},"/notification"),Object(v.jsx)("div",{className:"menu-title",children:Object(v.jsx)("p",{children:"SOPORTE"})}),Object(v.jsxs)(y,{icon:Object(v.jsx)(x.a,{}),title:"Soporte",children:[Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/support/callme"),children:"\xb7 Solicitudes de llamada"},"/support/callme"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/support/chat"),children:"\xb7 Solicitudes de chat"},"/support/chat")]},"support")]}):Object(v.jsxs)(l.a,{mode:"inline",defaultSelectedKeys:[e.location.pathname],defaultOpenKeys:[e.location.pathname.split("/")[1]],style:{height:"100%",borderRight:0},children:[Object(v.jsx)("div",{className:"menu-title",children:Object(v.jsx)("p",{children:"SOPORTE"})}),Object(v.jsxs)(y,{icon:Object(v.jsx)(x.a,{}),title:"Soporte",children:[Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/website/comment"),children:"\xb7 Comentarios"},"/website/comment"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/support/callme"),children:"\xb7 Solicitudes de llamada"},"/support/callme"),Object(v.jsx)(l.a.Item,{onClick:()=>e.push("/support/chat"),children:"\xb7 Solicitudes de chat"},"/support/chat")]},"support")]})})})]})};var C=e=>{let{openDrawer:t,setOpenDrawer:a}=e;return Object(v.jsx)(r.a,{placement:"left",closable:!1,onClose:()=>{a(!1)},visible:t,children:Object(v.jsx)(k,{})},"right")},w=a(88);const I=new g.a;var N=()=>{const[e,t]=Object(n.useState)(!1),{user:a}=Object(n.useContext)(c.a),[r,s]=Object(n.useState)(),l=()=>{s(null)};return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(w.a,{user:a,data:r,setData:l,callback:l}),Object(v.jsx)(C,{openDrawer:e,setOpenDrawer:t}),Object(v.jsxs)("header",{children:[Object(v.jsx)("div",{className:"responsive-menu",children:Object(v.jsx)("img",{src:"/assets/icon/menu.svg",onClick:()=>t(!0)})}),Object(v.jsxs)("ul",{children:[Object(v.jsx)("li",{children:Object(v.jsx)("img",{src:"/assets/icon/notification.svg"})}),Object(v.jsx)("li",{children:Object(v.jsx)("img",{src:"/assets/icon/settings.svg",onClick:()=>(I.remove("token"),void(window.location.href="/login"))})}),Object(v.jsx)("li",{children:Object(v.jsx)("img",{className:"profile",src:"/assets/icon/user_3.svg",onClick:()=>{s({user:a})}})})]})]})]})},E=a(18);t.a=e=>{let{children:t,loader:a=!1}=e;return Object(v.jsxs)(v.Fragment,{children:[a&&Object(v.jsx)(E.a,{type:"loader"}),Object(v.jsxs)("div",{className:"layout",children:[Object(v.jsx)(k,{}),Object(v.jsxs)("div",{className:"layout-content",children:[Object(v.jsx)(N,{}),Object(v.jsx)("main",{children:t})]})]})]})}},91:function(e,t,a){"use strict";a(0);var n=a(540),r=a(109),s=a(541),c=a(1);t.a=e=>{let{handleEdit:t,handleDelete:a}=e;return Object(c.jsxs)(n.b,{size:"middle",children:[t?Object(c.jsx)("a",{className:"action-edit",onClick:t,children:Object(c.jsx)(r.a,{})}):null,a?Object(c.jsx)("a",{className:"action-delete",onClick:a,children:Object(c.jsx)(s.a,{})}):null]})}},92:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,r,s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();t.confirmAlert=function(e){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"feGaussianBlur");t.setAttribute("stdDeviation","0.3");var a=document.createElementNS(e,"filter");a.setAttribute("id","gaussian-blur"),a.appendChild(t);var n=document.createElementNS(e,"svg");n.setAttribute("id","react-confirm-alert-firm-svg"),n.setAttribute("class","react-confirm-alert-svg"),n.appendChild(a),document.body.appendChild(n)}(),function(e){var t=document.getElementById("react-confirm-alert");t||(document.body.children[0].classList.add("react-confirm-alert-blur"),(t=document.createElement("div")).id="react-confirm-alert",document.body.appendChild(t)),(0,o.render)(l.default.createElement(m,e),t)}(e)};var c=a(0),l=d(c),i=d(a(12)),o=a(17);function d(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var m=(r=n=function(e){function t(){var e,a,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,s=Array(r),c=0;c<r;c++)s[c]=arguments[c];return a=n=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.handleClickButton=function(e){e.onClick&&e.onClick(),n.close()},n.handleClickOverlay=function(e){var t=n.props,a=t.closeOnClickOutside,r=t.onClickOutside,s=e.target===n.overlay;a&&s&&(r(),n.close())},n.close=function(){var e=n.props.afterClose;document.body.classList.remove("react-confirm-alert-body-element"),function(){var e=document.getElementById("react-confirm-alert");e&&((0,o.unmountComponentAtNode)(e),e.parentNode.removeChild(e))}(),function(e){var t=document.getElementById("react-confirm-alert-firm-svg");t&&t.parentNode.removeChild(t);document.body.children[0].classList.remove("react-confirm-alert-blur"),e()}(e)},n.keyboardClose=function(e){var t=n.props,a=t.closeOnEscape,r=t.onKeypressEscape,s=t.keyCodeForClose,c=e.keyCode,l=27===c;s.includes(c)&&n.close(),a&&l&&(r(e),n.close())},n.componentDidMount=function(){document.addEventListener("keydown",n.keyboardClose,!1)},n.componentWillUnmount=function(){document.removeEventListener("keydown",n.keyboardClose,!1),n.props.willUnmount()},n.renderCustomUI=function(){var e=n.props,t=e.title,a=e.message,r=e.buttons;return(0,e.customUI)({title:t,message:a,buttons:r,onClose:n.close})},u(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.title,n=t.message,r=t.buttons,s=t.childrenElement,c=t.customUI,i=t.overlayClassName;return l.default.createElement("div",{className:"react-confirm-alert-overlay "+i,ref:function(t){return e.overlay=t},onClick:this.handleClickOverlay},l.default.createElement("div",{className:"react-confirm-alert"},c?this.renderCustomUI():l.default.createElement("div",{className:"react-confirm-alert-body"},a&&l.default.createElement("h1",null,a),n,s(),l.default.createElement("div",{className:"react-confirm-alert-button-group"},r.map((function(t,a){return l.default.createElement("button",{key:a,onClick:function(){return e.handleClickButton(t)},className:t.className},t.label)}))))))}}]),t}(c.Component),n.propTypes={title:i.default.string,message:i.default.string,buttons:i.default.array.isRequired,childrenElement:i.default.func,customUI:i.default.func,closeOnClickOutside:i.default.bool,closeOnEscape:i.default.bool,keyCodeForClose:i.default.arrayOf(i.default.number),willUnmount:i.default.func,afterClose:i.default.func,onClickOutside:i.default.func,onKeypressEscape:i.default.func,overlayClassName:i.default.string},n.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,keyCodeForClose:[],willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},r);t.default=m},93:function(e,t,a){}}]);
//# sourceMappingURL=10.7fca2ada.chunk.js.map