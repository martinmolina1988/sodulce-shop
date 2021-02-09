import React, { Component } from "react";
import { Markup } from 'interweave';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "./TextEditor.scss";
import draftToHtml from "draftjs-to-html";
import { Button, Modal } from "react-bootstrap";
import { editoSobreMi } from "../../api/ProducsApi";

export default class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    render() {
        const onClick = () => {
            editoSobreMi(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            this.props.setShow(false)
        }
        const { editorState } = this.state;
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        return (
            <div >


                <Modal className="tweet-modal"
                    show={this.props.show}
                    onHide={() => this.props.setShow(false)}
                    centered
                    size="lg">
                    <Modal.Header >
                        <Modal.Title>Editar sobre mi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Markup content={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />

                        <Editor
                            editorState={editorState}
                            toolbarClassName=".rdw-editor-toolbar"
                            wrapperClassName="wrapperClassName"
                            editorClassName="rdw-editor-main "
                            onEditorStateChange={this.onEditorStateChange}
                        />
                        <textarea
                            disabled
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        ></textarea>

                        <Button onClick={onClick} >Subir</Button>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.setShow(false)}>
                            Close
          </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}