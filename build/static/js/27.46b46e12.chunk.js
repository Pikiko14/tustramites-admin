(this["webpackJsonptu-experto-lega-admin"]=this["webpackJsonptu-experto-lega-admin"]||[]).push([[27],{113:function(e,t,a){"use strict";var s=a(77),c=a(0),i={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M511.4 124C290.5 124.3 112 303 112 523.9c0 128 60.2 242 153.8 315.2l-37.5 48c-4.1 5.3-.3 13 6.3 12.9l167-.8c5.2 0 9-4.9 7.7-9.9L369.8 727a8 8 0 00-14.1-3L315 776.1c-10.2-8-20-16.7-29.3-26a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-7.5 7.5-15.3 14.5-23.4 21.2a7.93 7.93 0 00-1.2 11.1l39.4 50.5c2.8 3.5 7.9 4.1 11.4 1.3C854.5 760.8 912 649.1 912 523.9c0-221.1-179.4-400.2-400.6-399.9z"}}]},name:"undo",theme:"outlined"},l=a(81),n=function(e,t){return c.createElement(l.a,Object(s.a)(Object(s.a)({},e),{},{ref:t,icon:i}))},r=c.forwardRef(n);t.a=r},216:function(e){e.exports=JSON.parse('[{"state":"GUAYAS","cities":["GUAYAQUIL","MILAGRO"]},{"state":"PICHINCHA","cities":["QUITO"]},{"state":"AZUAY","cities":["CUENCA"]},{"state":"SANTO DOMINGO","cities":["SANTO DOMINGO DE LOS COLORADOS"]},{"state":"EL ORO","cities":["MACHALA"]},{"state":"MANABI","cities":["MANTA","PORTOVIEJO"]},{"state":"ESMERALDAS","cities":["ESMERALDAS","ELOY ALFARO"]},{"state":"TUNGURAHUA","cities":["AMBATO"]},{"state":"IMBABURA","cities":["IBARRA"]}]')},231:function(e,t,a){"use strict";var s=a(0),c=a(543).a,i=a(554),l=a(308),n=a(539),r=a(146),o=a(91),d=a(89),j=a(87),u=a(1);t.a=e=>{let{form:t,setSchedules:a,schedules:b}=e;const[m,h]=Object(s.useState)(!1),O=["6:00",,"7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"],x=[{title:"D\xedas",dataIndex:"days",key:"days",render:e=>Object(u.jsx)("a",{children:e})},{title:"Hora Inicio",dataIndex:"startHour",key:"startHour",render:e=>Object(u.jsx)("a",{children:e})},{title:"Hora Fin",dataIndex:"endHour",key:"endHour",render:e=>Object(u.jsx)("a",{children:e})},{title:"Acci\xf3n",dataIndex:"action",key:"action",render:(e,t)=>Object(u.jsx)(o.a,{handleDelete:()=>g(t)})}],p=()=>{j.a.show({type:"error",title:"Error",message:"Hay campos necesarios que no se han diligenciado.",btnOk:"Aceptar",fnOk:()=>{},btnCancel:"Cancelar"})},g=e=>{let t=[...b];for(let s=0;s<t.length;s++)t[s].days===e.days&&t[s].startHour===e.startHour&&t[s].endHour===e.endHour&&(t.splice(s,1),a(t))};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(c,{children:Object(u.jsxs)(i.a.Item,{label:"Horario:",name:"lunes",valuePropName:"checked",id:"lunes",children:[Object(u.jsxs)(c,{children:[Object(u.jsx)(i.a.Item,{name:"lunes",valuePropName:"checked",id:"lunes",children:Object(u.jsx)(l.a,{disabled:m,children:"Lunes"})}),Object(u.jsx)(i.a.Item,{name:"martes",valuePropName:"checked",id:"martes",children:Object(u.jsx)(l.a,{disabled:m,children:"Martes"})}),Object(u.jsx)(i.a.Item,{name:"miercoles",valuePropName:"checked",id:"miercoles",children:Object(u.jsx)(l.a,{disabled:m,children:"Mi\xe9rcoles"})}),Object(u.jsx)(i.a.Item,{name:"jueves",valuePropName:"checked",id:"jueves",children:Object(u.jsx)(l.a,{disabled:m,children:"Jueves"})}),Object(u.jsx)(i.a.Item,{name:"viernes",valuePropName:"checked",id:"viernes",children:Object(u.jsx)(l.a,{disabled:m,children:"Viernes"})}),Object(u.jsx)(i.a.Item,{name:"sabado",valuePropName:"checked",id:"sabado",children:Object(u.jsx)(l.a,{children:"S\xe1bado"})}),Object(u.jsx)(i.a.Item,{name:"lunes_viernes",valuePropName:"checked",id:"lunes_viernes",children:Object(u.jsx)(l.a,{onChange:()=>{t.getFieldValue("lunes_viernes")?h(!0):h(!1)},children:"Lunes-Viernes"})})]}),Object(u.jsx)(c,{children:Object(u.jsx)(i.a.Item,{children:Object(u.jsx)(i.a.Item,{name:"startHour",id:"startHour",label:"Hora inicio",rules:[{required:!0,message:"La hora de inicio es requerida"}],hasFeedback:!0,children:Object(u.jsx)(n.a,{placeholder:"Hora inicio",allowClear:!0,children:O.map(((e,t)=>Object(u.jsx)("option",{value:e,children:e},t)))})})})}),Object(u.jsx)(c,{children:Object(u.jsx)(i.a.Item,{children:Object(u.jsx)(i.a.Item,{name:"endHour",id:"endHour",label:"Hora fin",rules:[{required:!0,message:"La hora fin es requerida"}],hasFeedback:!0,children:Object(u.jsx)(n.a,{placeholder:"Hora fin",allowClear:!0,children:O.map(((e,t)=>Object(u.jsx)("option",{value:e,children:e},t)))})})})}),Object(u.jsx)(c,{children:Object(u.jsx)(r.a,{onClick:()=>(()=>{if(t.getFieldValue("lunes")||t.getFieldValue("martes")||t.getFieldValue("miercoles")||t.getFieldValue("jueves")||t.getFieldValue("viernes")||t.getFieldValue("sabado")||t.getFieldValue("lunes_viernes"))if(t.getFieldValue("startHour")&&t.getFieldValue("endHour")){var e=new Object,s="",c={};t.getFieldValue("lunes_viernes")?s+="lunes-martes-miercoles-jueves-viernes-sabado":(t.getFieldValue("lunes")&&(s+="lunes-"),t.getFieldValue("martes")&&(s+="martes-"),t.getFieldValue("miercoles")&&(s+="miercoles-"),t.getFieldValue("jueves")&&(s+="jueves-"),t.getFieldValue("viernes")&&(s+="viernes-")),t.getFieldValue("sabado")&&(s+="sabado"),c.startHour=t.getFieldValue("startHour"),c.endHour=t.getFieldValue("endHour"),e.days=s,e.startHour=t.getFieldValue("startHour"),e.endHour=t.getFieldValue("endHour");var i=[...b];i.push(e),a(i);let l={lunes:!1,martes:!1,miercoles:!1,jueves:!1,viernes:!1,sabado:!1,startHour:void 0,endHour:void 0};t.setFieldsValue(l)}else p();else p()})(),children:"Guardar Horario"})})]})}),Object(u.jsx)("div",{className:"main-card-table",children:Object(u.jsx)(d.a,{columns:x,data:b})})]})}},566:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(146),i=a(15),l=a(90),n=a(89),r=a(91),o=(a(554),a(535),a(536),a(555),a(539),a(216),a(231),a(87)),d=a(1);var j=a(113);t.default=e=>{const[t,a]=Object(s.useState)([]),[u,b]=Object(s.useState)(),m=[{title:"Nombre",dataIndex:"name",key:"name",render:e=>Object(d.jsx)("a",{children:e})},{title:"Contacto",dataIndex:"contact",key:"contact",render:e=>Object(d.jsx)("a",{children:e})},{title:"Direcci\xf3n",dataIndex:"address",key:"address",render:e=>Object(d.jsx)("a",{children:e})},{title:"Correo",dataIndex:"email",key:"email",render:e=>Object(d.jsx)("a",{children:e})},{title:"Tel\xe9fono",dataIndex:"phone",key:"phone",render:e=>Object(d.jsx)("a",{children:e})},{title:"Acci\xf3n",dataIndex:"action",key:"action",render:(e,t)=>Object(d.jsx)(r.a,{handleEdit:()=>h(t),handleDelete:()=>O(t)})}],h=t=>{e.history.push("/notarycrud?id="+t._id)},O=e=>{o.a.show({type:"warning",title:"Confirmaci\xf3n",message:"\xbfSeguro desea eliminar esta notaria?",btnOk:"Aceptar",fnOk:()=>{x(e)},btnCancel:"Cancelar",fnCancel:()=>{}})},x=async e=>{200==(await i.a.delete("/api/notary/"+e._id)).status&&p()},p=async()=>{const e=await i.a.get("/api/notary");200==e.status&&a(e.data)};return Object(s.useEffect)((()=>{p()}),[]),Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(l.a,{children:Object(d.jsxs)("div",{className:"header-page",children:[Object(d.jsx)("h1",{children:"Notarias"}),Object(d.jsxs)("div",{className:"main-card card",children:[Object(d.jsx)("div",{className:"main-card-action",children:Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsx)(c.a,{type:"primary",onClick:()=>{e.history.push("/notarycrud")},children:"Crear Notaria"})}),Object(d.jsx)("li",{children:Object(d.jsx)(j.a,{})})]})}),Object(d.jsx)("div",{className:"main-card-table",children:Object(d.jsx)(n.a,{columns:m,data:t})})]})]})})})}},87:function(e,t,a){"use strict";a(0);var s=a(92),c=(a(93),a(1));const i={show(e){Object(s.confirmAlert)({closeOnClickOutside:!1,customUI:t=>{let{onClose:a}=t;return Object(c.jsx)("div",{className:"modal-alert",children:Object(c.jsx)("div",{className:"modal-content "+e.type,children:Object(c.jsxs)("div",{className:"content",children:[Object(c.jsxs)("div",{className:"alert-content",children:[Object(c.jsx)("p",{className:"alert-title",children:e.title}),Object(c.jsx)("p",{className:"alert-message",children:e.message})]}),Object(c.jsxs)("div",{className:"alert-buttons",children:[Object(c.jsx)("button",{type:"submit",className:"btn-large",onClick:()=>(a(),e.fnOk()),children:e.btnOk}),e.fnCancel?Object(c.jsx)("button",{type:"submit",className:"btn-large outline",onClick:()=>(a(),e.fnCancel()),children:e.btnCancel}):null]})]})})})}})}};t.a=i},88:function(e,t,a){"use strict";var s=a(0),c=a(536),i=a(15),l=a(554),n=a(146),r=a(535),o=a(539),d=a(552),j=a(99),u=a(1);t.a=e=>{let{user:t,data:a,setData:b,callback:m}=e;const[h]=l.a.useForm(),[O,x]=Object(s.useState)([]),p=()=>{const e=new FormData;t?(O.length>0&&e.append("image",O[0].originFileObj),e.append("user",JSON.stringify({first_name:h.getFieldValue("first_name"),last_name:h.getFieldValue("last_name"),email:h.getFieldValue("email"),password:h.getFieldValue("password"),role:h.getFieldValue("role"),url_image:""})),i.a.put("/api/user/"+(t._id?t._id:t.id),e).then((e=>{b(null),m(t._id?t._id:t.id)}))):(O.length>0&&e.append("image",O[0].originFileObj),e.append("user",JSON.stringify({first_name:h.getFieldValue("first_name"),last_name:h.getFieldValue("last_name"),email:h.getFieldValue("email"),password:h.getFieldValue("password"),role:h.getFieldValue("role"),url_image:""})),i.a.post("/api/user",e).then((e=>{b(null),m()})))},g=()=>{b(null)};return Object(s.useEffect)((()=>{if(h.resetFields(),t){let e={first_name:t.first_name,last_name:t.last_name,password:t.password,email:t.email,role:t.role};if(h.setFieldsValue(e),t.url_image){let e=t.url_image;x([{uid:"-1",name:"load.png",status:"done",url:e,thumbUrl:e}])}}else x([])}),[t,a]),Object(u.jsx)(c.a,{visible:a,title:"Informaci\xf3n del usuario",onOk:p,onCancel:g,forceRender:!0,maskClosable:!1,footer:[Object(u.jsx)(n.a,{onClick:g,children:"Cancelar"},"back"),Object(u.jsx)(n.a,{type:"primary",onClick:p,children:"Guardar"},"submit")],children:Object(u.jsxs)(l.a,{layout:"vertical",form:h,children:[Object(u.jsx)(l.a.Item,{label:"Nombre(s)",name:"first_name",id:"first_name",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese el (los) nombre(s)!"},{min:4,message:"El (Los) nombre(s) debe(n) tener al menos 3 caracteres!"}],children:Object(u.jsx)(r.a,{})}),Object(u.jsx)(l.a.Item,{label:"Apellidos",name:"last_name",id:"last_name",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese los apellidos!"},{min:4,message:"Los apellidos deben tener al menos 4 caracteres!"}],children:Object(u.jsx)(r.a,{})}),Object(u.jsx)(l.a.Item,{label:"Correo",name:"email",id:"email",hasFeedback:!0,rules:[{required:!0,type:"email",message:"El valor ingresado no es un correo el\xe9ctronico!"}],children:Object(u.jsx)(r.a,{})}),Object(u.jsx)(l.a.Item,{label:"Contrase\xf1a",name:"password",id:"password",hasFeedback:!0,rules:[{required:!0,message:"Por favor ingrese la contrase\xf1a!"},{min:8,message:"La contrase\xf1a debe tener al menos 8 caracteres!"}],children:Object(u.jsx)(r.a,{type:"password"})}),Object(u.jsx)(l.a.Item,{name:"role",id:"role",label:"Rol",rules:[{required:!0}],children:Object(u.jsxs)(o.a,{placeholder:"Seleccione un rol",allowClear:!0,children:[Object(u.jsx)("option",{value:"ADMINISTRADOR",children:"ADMINISTRADOR"}),Object(u.jsx)("option",{value:"ASESOR LEGAL",children:"ASESOR LEGAL"}),Object(u.jsx)("option",{value:"CALL CENTER",children:"CALL CENTER"})]})}),Object(u.jsx)(j.a,{rotate:!1,aspect:1,modalTitle:"Editar Imagen",children:Object(u.jsx)(d.a,{listType:"picture-card",fileList:O,defaultFileList:[...O],onChange:e=>{x(e.fileList)},children:0==O.length&&"+ Upload"})})]})})}},89:function(e,t,a){"use strict";a(0);var s=a(551),c=a(1);t.a=e=>{let{columns:t,data:a}=e;return Object(c.jsx)(s.a,{columns:t,dataSource:a})}},90:function(e,t,a){"use strict";var s=a(0),c=a(557),i=a(3),l=a(16),n=a(303),r=a.p+"static/media/tutorial.5db87431.pdf",o=a(576),d=a(577),j=a(578),u=a(579),b=a(580),m=a(581),h=a(582),O=a(583),x=a(584),p=a(585),g=a(586),v=a(11),C=a(1);new v.a;const{SubMenu:I}=n.a;var f=()=>{const e=Object(i.g)(),{user:t}=Object(s.useContext)(l.a);return Object(C.jsxs)("div",{className:"drawer",children:[Object(C.jsx)("div",{className:"drawer-logo",children:Object(C.jsx)("img",{src:"/assets/logo/logo-white.svg"})}),Object(C.jsx)("nav",{children:Object(C.jsx)(C.Fragment,{children:t&&"ADMINISTRADOR"===t.role?Object(C.jsxs)(n.a,{mode:"inline",defaultSelectedKeys:[e.location.pathname],defaultOpenKeys:[e.location.pathname.split("/")[1]],style:{height:"100%",borderRight:0},children:[Object(C.jsx)("div",{className:"menu-title",children:Object(C.jsx)("p",{children:"PANEL DE CONTROL"})}),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(o.a,{}),children:"Inicio"},"/"),Object(C.jsx)("div",{className:"menu-title",children:Object(C.jsx)("p",{children:"TR\xc1MITES"})}),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(d.a,{}),onClick:()=>e.push("/"),children:"Mis tr\xe1mites"},"10"),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(j.a,{}),onClick:()=>e.push("/notary"),children:"Notarias"},"/notary"),Object(C.jsxs)(I,{icon:Object(C.jsx)(u.a,{}),title:"Actos Notariales",children:[Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/notarial-act/view"),children:"\xb7 Lista de Actos Notariales"},"/notarial-act/view"),Object(C.jsxs)(I,{icon:Object(C.jsx)(u.a,{}),title:"Creaci\xf3n Acto Notarial",children:[Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/notarial-act/category"),children:"1\xb7 Categor\xedas"},"/notarial-act/category"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/notarial-act/actor"),children:"2\xb7 Actores"},"/notarial-act/actor"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/notarial-act/input"),children:"3\xb7 Campos Formularios"},"/notarial-act/input"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/notarial-act/form"),children:"4\xb7 Nuevo Acto Notarial"},"/notarial-act/form")]},"seb-notarial-act"),Object(C.jsxs)(n.a.Item,{children:[Object(C.jsx)("a",{href:r,target:"_blank"}),"\xbfNecesitas ayuda?"]},"/notarial-act/tutorial")]},"notarial-act"),Object(C.jsx)("div",{className:"menu-title",children:Object(C.jsx)("p",{children:"CONFIGURACI\xd3N"})}),Object(C.jsxs)(I,{icon:Object(C.jsx)(b.a,{}),title:"Web Site",children:[Object(C.jsxs)(I,{icon:Object(C.jsx)(m.a,{}),title:"Crear Pregunta",children:[Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/categoryquestion"),children:"\xb7 Categor\xedas Pregunta"},"/website/categoryquestion"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/subcategoryquestion"),children:"\xb7 Subcategor\xedas Pregunta"},"/website/subcategoryquestion"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/question"),children:"\xb7 Preguntas frecuentes"},"/website/question")]},"seb-question"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/banner"),children:"\xb7 Banner"},"/website/banner"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/internationalization"),children:"\xb7 Internacionalizaci\xf3n"},"/website/internationalization"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/page"),children:"\xb7 Politicas y tratamiento de datos"},"/website/page"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/contact"),children:"\xb7 Solicitudes de contacto"},"/website/contact"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/comment"),children:"\xb7 Comentarios"},"/website/comment")]},"website"),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(h.a,{}),onClick:()=>e.push("/user"),children:"Usuarios"},"/user"),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(O.a,{}),onClick:()=>e.push("/chatbot"),children:"Chatbot"},"/chatbot"),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(x.a,{}),onClick:()=>e.push("/aditional-config"),children:"Configuraci\xf3n adicional"},"/aditional-config"),Object(C.jsx)(n.a.Item,{icon:Object(C.jsx)(p.a,{}),onClick:()=>e.push("/notification"),children:"Notificaciones"},"/notification"),Object(C.jsx)("div",{className:"menu-title",children:Object(C.jsx)("p",{children:"SOPORTE"})}),Object(C.jsxs)(I,{icon:Object(C.jsx)(g.a,{}),title:"Soporte",children:[Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/support/callme"),children:"\xb7 Solicitudes de llamada"},"/support/callme"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/support/chat"),children:"\xb7 Solicitudes de chat"},"/support/chat")]},"support")]}):Object(C.jsxs)(n.a,{mode:"inline",defaultSelectedKeys:[e.location.pathname],defaultOpenKeys:[e.location.pathname.split("/")[1]],style:{height:"100%",borderRight:0},children:[Object(C.jsx)("div",{className:"menu-title",children:Object(C.jsx)("p",{children:"SOPORTE"})}),Object(C.jsxs)(I,{icon:Object(C.jsx)(g.a,{}),title:"Soporte",children:[Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/website/comment"),children:"\xb7 Comentarios"},"/website/comment"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/support/callme"),children:"\xb7 Solicitudes de llamada"},"/support/callme"),Object(C.jsx)(n.a.Item,{onClick:()=>e.push("/support/chat"),children:"\xb7 Solicitudes de chat"},"/support/chat")]},"support")]})})})]})};var k=e=>{let{openDrawer:t,setOpenDrawer:a}=e;return Object(C.jsx)(c.a,{placement:"left",closable:!1,onClose:()=>{a(!1)},visible:t,children:Object(C.jsx)(f,{})},"right")},N=a(88);const y=new v.a;var A=()=>{const[e,t]=Object(s.useState)(!1),{user:a}=Object(s.useContext)(l.a),[c,i]=Object(s.useState)(),n=()=>{i(null)};return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(N.a,{user:a,data:c,setData:n,callback:n}),Object(C.jsx)(k,{openDrawer:e,setOpenDrawer:t}),Object(C.jsxs)("header",{children:[Object(C.jsx)("div",{className:"responsive-menu",children:Object(C.jsx)("img",{src:"/assets/icon/menu.svg",onClick:()=>t(!0)})}),Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:Object(C.jsx)("img",{src:"/assets/icon/notification.svg"})}),Object(C.jsx)("li",{children:Object(C.jsx)("img",{src:"/assets/icon/settings.svg",onClick:()=>(y.remove("token"),void(window.location.href="/login"))})}),Object(C.jsx)("li",{children:Object(C.jsx)("img",{className:"profile",src:"/assets/icon/user_3.svg",onClick:()=>{i({user:a})}})})]})]})]})},w=a(18);t.a=e=>{let{children:t,loader:a=!1}=e;return Object(C.jsxs)(C.Fragment,{children:[a&&Object(C.jsx)(w.a,{type:"loader"}),Object(C.jsxs)("div",{className:"layout",children:[Object(C.jsx)(f,{}),Object(C.jsxs)("div",{className:"layout-content",children:[Object(C.jsx)(A,{}),Object(C.jsx)("main",{children:t})]})]})]})}},91:function(e,t,a){"use strict";a(0);var s=a(540),c=a(109),i=a(541),l=a(1);t.a=e=>{let{handleEdit:t,handleDelete:a}=e;return Object(l.jsxs)(s.b,{size:"middle",children:[t?Object(l.jsx)("a",{className:"action-edit",onClick:t,children:Object(l.jsx)(c.a,{})}):null,a?Object(l.jsx)("a",{className:"action-delete",onClick:a,children:Object(l.jsx)(i.a,{})}):null]})}}}]);
//# sourceMappingURL=27.46b46e12.chunk.js.map