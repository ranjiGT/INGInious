import React from "react";
import { Well } from 'react-bootstrap';
import './index.css';

import UltimatePagination from './ultimate_pagination';
import BankCourse from './bank_course'
import CourseAutosuggest from './course_autosuggest'
import CustomAlert from './custom_alert';

class BankCourseList extends React.Component {

    render() {
        let courses = this.props.courses.map((course, i) => {
            if(i >= ((this.props.page - 1) * this.props.limit) && i < (this.props.page * this.props.limit)) {
                return (
                    <BankCourse
                        name={course.name}
                        removable={course.is_removable}
                        key={i}
                        callbackOnDeleteCourse={this.props.callbackOnDeleteCourse}
                    />
                )
            }
        });

        return (
            <div>
                <CustomAlert message={this.props.dataAlert.data.message}
                             isVisible={this.props.dataAlert.isVisibleAlert}
                             callbackParent={this.props.callbackOnChildChangedClose}
                             styleAlert={this.props.dataAlert.styleAlert}
                             titleAlert={this.props.dataAlert.titleAlert}
                             callbackSetAlertInvisible={this.props.callbackSetAlertInvisible}
                />
                <Well bsSize="small">
                    <h5>Select course to become in bank</h5>
                    <CourseAutosuggest
                        courses={this.props.availableCourses}
                        callbackOnClick={this.props.callbackAddCourse}
                        messageButton={"Add course to bank"}
                        mdInput={3}
                        mdButton={2}
                    />
                </Well>

                <div>The following courses are marked as task sources: </div>

                <div className="list-group">{courses}</div>

                <UltimatePagination
                     currentPage={this.props.page}
                     totalPages={this.props.totalPages}
                     onChange={this.props.callbackOnPageChange}
                />
            </div>

        );
    }
}

export default BankCourseList;