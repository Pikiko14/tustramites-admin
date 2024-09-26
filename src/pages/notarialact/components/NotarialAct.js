import React, { useEffect, useState } from "react";
import { Form, Input, Button, Tabs, Select } from "antd";
import queryString from "query-string";
import { DeleteOutlined } from "@ant-design/icons";
import HttpClient from "../../../helpers/network/HttpClient";

// COMPONENTS
import Layout from "../../../components/layout/Layout";
import NotarialActDialog from "./modal/NotarialActDialog";
import TabHeader from "./tab/TabHeader";
import TabActors from "./tab/TabActors";
import TabDocuments from "./tab/TabDocuments";
import TabAditionalInfo from "./tab/TabAditionalInfo";
import Alert from "../../../helpers/alert/Alert";

const NotarialAct = (props) => {
  const [notarialAct, setNotarialAct] = useState();
  const [listActors, setListActors] = useState([]);
  const [listActorsAdd, setListActorsAdd] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listInputs, setListInpunts] = useState([]);
  const [selectedActor, setSelectedActor] = useState();
  const [tableAux, setTableAux] = useState();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [notarialActDialog, setNotarialActDialog] = useState();
  const [documents, setDocuments] = useState([]);
  const [pages, setPages] = useState([]);
  const { TabPane } = Tabs;
  const [prices, setPrices] = useState([]);
  const [notaries, setNotaries] = useState([]);
  const [price, setPrice] = useState(0);
  const [type, setTypePrice] = useState(null);
  const [notaryPrice, setNotary] = useState(null);
  const [notaryLabel, setNotaryLabel] = useState(null);

  const listTypePrices = [
    {
      value: "owner",
      label: "Propio",
    },
    {
      value: "notary",
      label: "Notaria",
    },
  ];

  const callbackNotarialAct = () => {
    props.history.push("/notarial-act/view");
  };

  const loadActors = async () => {
    const response = await HttpClient.get("/api/actor");
    if (response.status == 200) {
      setListActors(response.data);
    }
  };

  const loadCategories = async () => {
    const response = await HttpClient.get("/api/category");
    if (response.status == 200) {
      setListCategories(response.data);
    }
  };

  const loadInputs = async () => {
    const response = await HttpClient.get("/api/input/");
    if (response.status == 200) {
      setListInpunts(response.data);
    }
  };

  const loadValues = async (id) => {
    const response = await HttpClient.get("/api/notarialact/" + id);
    if (response.status == 200) {
      console.log(response.data);
      setNotarialAct(response.data);
      let data = {
        name: response.data.name,
        category: response.data.category && response.data.category.name,
        description: response.data.description,
        time_delivery: response.data.time_delivery,
        duration: response.data.duration,
        document_result: response.data.document_result,
        notary: response.data.notary,
        payment: response.data.payment,
        date: response.data.date,
        note: response.data.note,
        note_2: response.data.note_2,
        page: response.data.page && response.data.page._id,
        prices: [],
      };
      form.setFieldsValue(data);
      setTableAux(response.data.form);
      setListActorsAdd(response.data.actors);
      setDocuments(response.data.documents);
      setPrices([...response.data.prices]);
    }
  };

  const loadPages = async () => {
    const response = await HttpClient.get("/api/page");
    if (response.status == 200) {
      setPages(response.data);
    }
  };

  useEffect(() => {
    form.resetFields();
    loadActors();
    loadCategories();
    loadInputs();
    loadPages();

    let { id } = queryString.parse(props.location.search);
    if (id) {
      loadValues(id);
    }
  }, []);

  const handleOk = async () => {
    if (documents.length > 0) {
      if (form.getFieldValue("page")) {
        if (notarialAct) {
          const response = await HttpClient.put(
            "/api/notarialact/" + notarialAct._id,
            {
              name: form.getFieldValue("name"),
              category: listCategories.find(
                (category) =>
                  category.name === form.getFieldValue("category") ||
                  category._id === form.getFieldValue("category")
              )._id,
              description: form.getFieldValue("description"),
              form: tableAux ? tableAux : {},
              actors: listActorsAdd,
              documents: documents,
              notary: form.getFieldValue("notary")
                ? form.getFieldValue("notary")
                : false,
              payment: form.getFieldValue("payment")
                ? form.getFieldValue("payment")
                : false,
              document_result: form.getFieldValue("document_result"),
              date: form.getFieldValue("date")
                ? form.getFieldValue("date")
                : false,
              time_delivery: form.getFieldValue("time_delivery"),
              duration: form.getFieldValue("duration"),
              note: form.getFieldValue("note"),
              note_2: form.getFieldValue("note_2"),
              page: form.getFieldValue("page"),
              prices: prices,
            }
          );
          if (response.status == 200) {
            form.setFieldsValue(null);
            callbackNotarialAct();
          }
        } else {
          const response = await HttpClient.post("/api/notarialact", {
            name: form.getFieldValue("name"),
            category: listCategories.find(
              (category) =>
                category.name === form.getFieldValue("category") ||
                category._id === form.getFieldValue("category")
            )._id,
            description: form.getFieldValue("description"),
            form: tableAux ? tableAux : {},
            actors: listActorsAdd,
            documents: documents,
            notary: form.getFieldValue("notary")
              ? form.getFieldValue("notary")
              : false,
            payment: form.getFieldValue("payment")
              ? form.getFieldValue("payment")
              : false,
            document_result: form.getFieldValue("document_result"),
            date: form.getFieldValue("date")
              ? form.getFieldValue("date")
              : false,
            time_delivery: form.getFieldValue("time_delivery"),
            duration: form.getFieldValue("duration"),
            note: form.getFieldValue("note"),
            note_2: form.getFieldValue("note_2"),
            page: form.getFieldValue("page"),
            prices: prices,
          });
          if (response.status == 201) {
            form.setFieldsValue(null);
            callbackNotarialAct();
          }
        }
      } else {
        Alert.show({
          type: "error",
          title: "Advertencia",
          message:
            "Debe seleccionar una politica y tratamiento de datos para este acto notarial.",
          btnOk: "Aceptar",
          fnOk: () => {},
          btnCancel: "Cancelar",
        });
      }
    } else {
      Alert.show({
        type: "error",
        title: "Advertencia",
        message:
          "Debe existir al menos un documento para que se cree el acto notarial",
        btnOk: "Aceptar",
        fnOk: () => {},
        btnCancel: "Cancelar",
      });
    }
  };

  const setPricesList = () => {
    if (!price) {
      Alert.show({
        type: "error",
        title: "Advertencia",
        message: "Ingresa el precio",
        btnOk: "Aceptar",
        fnOk: () => {},
        btnCancel: "Cancelar",
      });
      return false;
    }

    if (!type) {
      Alert.show({
        type: "error",
        title: "Advertencia",
        message: "Selecciona el típo de precio",
        btnOk: "Aceptar",
        fnOk: () => {},
        btnCancel: "Cancelar",
      });
      return false;
    }

    if (type == "notary" && !notaryPrice) {
      Alert.show({
        type: "error",
        title: "Advertencia",
        message: "Selecciona la notaria",
        btnOk: "Aceptar",
        fnOk: () => {},
        btnCancel: "Cancelar",
      });
      return false;
    }

    const data = {
      price,
      type,
      notary: notaryPrice,
      notaryLabel,
    };

    setPrices([...prices, data]);
  };

  const getNotaries = async () => {
    const response = await HttpClient.get("/api/notary");
    if (response.status === 200) {
      setNotaries(response.data);
    }
  };

  const deletePrice = (index) => {
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  const handleSetNotary = (notary) => {
    setNotary(notary);
    const name = notaries.find((n) => n._id === notary).name;
    setNotaryLabel(name);
  };

  useEffect(() => {
    getNotaries();
  }, []);

  return (
    <>
      <NotarialActDialog
        name={form.getFieldValue("name")}
        category={listCategories.find(
          (category) =>
            category.name === form.getFieldValue("category") ||
            category._id === form.getFieldValue("category")
        )}
        description={form.getFieldValue("description")}
        tableAux={tableAux}
        listActorsAdd={listActorsAdd}
        notarialAct={notarialAct}
        data={notarialActDialog}
        setData={setNotarialActDialog}
        callback={callbackNotarialAct}
      />
      <Layout>
        <div className="header-page">
          <h1>Acto Notarial</h1>

          <div className="main-card card">
            <div className="main-card-action">
              <ul>
                <li>
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Guardar
                  </Button>
                </li>
                <li>
                  <Button href={"/notarial-act/view"}>Regresar</Button>
                </li>
              </ul>
            </div>
            <div className="main-card">
              <Form form={form} layout="vertical">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="1. Encabezado" key="1">
                    <TabHeader
                      form={form}
                      listCategories={listCategories}
                      TextArea={TextArea}
                    />
                  </TabPane>

                  <TabPane tab="2. Actores" key="2">
                    <TabActors
                      form={form}
                      listActors={listActors}
                      listActorsAdd={listActorsAdd}
                      tableAux={tableAux}
                      listInputs={listInputs}
                      setListActorsAdd={setListActorsAdd}
                      setSelectedActor={setSelectedActor}
                      selectedActor={selectedActor}
                      setTableAux={setTableAux}
                    />
                  </TabPane>

                  <TabPane tab="3. Documentos" key="5">
                    <TabDocuments
                      form={form}
                      TextArea={TextArea}
                      setDocuments={setDocuments}
                      documents={documents}
                    />
                  </TabPane>

                  <TabPane tab="4. Información Adicional" key="6">
                    <TabAditionalInfo form={form} pages={pages} />
                  </TabPane>

                  <TabPane tab="5. Precios" key="7">
                    <div className="section-prices">
                      <div className="button">
                        <Form.Item name="price">
                          <Input
                            type="number"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Form.Item>

                        <Form.Item name="type">
                          <Select
                            placeholder="Seleccione tipo de precio"
                            onChange={(e) => setTypePrice(e)}
                          >
                            {listTypePrices.map((item, i) => (
                              <option key={i} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Select>
                        </Form.Item>

                        {type === "notary" ? (
                          <Form.Item name="notaryPrice">
                            <Select
                              placeholder="Seleccione la notaría"
                              onChange={(e) => handleSetNotary(e)}
                            >
                              {notaries.map((item, i) => (
                                <Select.Option key={i} value={item._id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        ) : null}
                        <Button
                          key="submit"
                          type="primary"
                          style={{ marginTop: "15px", marginLeft: "10px" }}
                          onClick={setPricesList}
                        >
                          Agregar
                        </Button>
                      </div>
                      <div className="form-prices">
                        {prices.length > 0 ? (
                          prices.map((price, index) => (
                            <div className="form-prices-item" key={index}>
                              <div className="form-prices-item2">
                                <strong>Precio</strong> <br />
                                {price.price}
                              </div>
                              <div className="form-prices-item2">
                                <strong>Tipo de precio</strong> <br />
                                <br />
                                {price.type === "notary"
                                  ? "Notaria"
                                  : "Propio"}
                              </div>
                              <div className="form-prices-item2">
                                <strong>Notaria</strong> <br />
                                {price.notary ? (price.notaryLabel || price.notary.name) : "-"}
                              </div>
                              <div className="form-prices-item2">
                                <a
                                  className="action-delete"
                                  onClick={() => deletePrice(index)}
                                  style={{ cursor: "pointer", marginTop: "15px" }}
                                >
                                  <DeleteOutlined />
                                </a>
                              </div>
                            </div>
                          ))
                        ) : (
                          <> </>
                        )}
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NotarialAct;
