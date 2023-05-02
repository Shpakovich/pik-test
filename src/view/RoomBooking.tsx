import React, {Component} from "react";
import FormRoomBooking from "../components/FormRoomBooking";
import FormSubmissionInfo from "../components/FormSubmissionInfo";

export type FormStatus = 'filling' | 'done' | 'error';
export default class RoomBooking extends Component<{}, {formStatus: FormStatus}> {
    constructor(props: any) {
        super(props);
        this.state = {
            formStatus: 'filling',
        };
        this.showInfo = this.showInfo.bind(this);
    }

    showInfo (status: FormStatus){
        this.setState({formStatus: status});
    }

    render() {
        let formContent;
        if (this.state.formStatus === 'filling') formContent = <FormRoomBooking onSubmit={this.showInfo} />
        else formContent = <FormSubmissionInfo status={this.state.formStatus} />
        return (
            <div className="FormRoomBooking">
                {formContent}
            </div>
        );
    }
}