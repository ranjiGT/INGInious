import web
import os
from .admin_api import AdminApi


class SubmissionsByVerdictApi(AdminApi):

    def get_statistics_by_verdict(self, course, late_submissions=False):
        course_id = course.get_id()
        admins = list(set(course.get_staff() + self.user_manager._superadmins))

        late_submissions_filter = True
        if not late_submissions:
            late_submissions_filter = {"$in": [False, None]}

        statistics_by_verdict = self.database.submissions.aggregate([
            {
                "$match": {
                    "courseid": course_id,
                    "custom.custom_summary_result": {"$ne": None},
                    "username": {"$nin": admins},
                    "is_late_submission": late_submissions_filter
                }
            },
            {
                "$group": {
                    "_id": {
                        "summary_result": "$custom.custom_summary_result",
                        "task_id": "$taskid"
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "task_id": "$_id.task_id",
                    "summary_result": "$_id.summary_result",
                    "count": 1
                }
            }
        ])

        return statistics_by_verdict

    def API_GET(self):
        parameters = web.input()

        course_id = self.get_mandatory_parameter(parameters, "course_id")
        course = self.get_course_and_check_rights(course_id)

        late_submissions = self.get_mandatory_parameter(parameters, "late_submissions")

        statistics_by_verdict = self.get_statistics_by_verdict(course, late_submissions.lower() == "true")
        course_tasks = course.get_tasks()
        sorted_tasks = sorted(course_tasks.values(),
                              key=lambda task: os.path.getctime(task.get_fs().prefix + 'task.yaml'))
        task_id_to_statistics = {}
        for element in statistics_by_verdict:
            task_id = element["task_id"]

            if task_id not in task_id_to_statistics:
                task_id_to_statistics[task_id] = []

            task_id_to_statistics[task_id].append({
                "count": element["count"],
                "summary_result": element["summary_result"]
            })

        statistics_by_verdict = []

        for task in sorted_tasks:
            _id = task.get_id()
            verdicts = task_id_to_statistics.get(_id, [])
            for verdict in verdicts:
                statistics_by_verdict.append({
                    "task_id": _id,
                    "task_name": task.get_name_or_id(self.user_manager.session_language()),
                    "summary_result": verdict["summary_result"],
                    "count": verdict["count"]
                })
        return 200, statistics_by_verdict
