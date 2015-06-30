UPDATE department SET right_value = right_value + 2 WHERE right_value >= 0;
UPDATE department SET left_value = left_value + 2 WHERE left_value >= 0;
INSERT INTO department(dept_id, dept_name, left_value, right_value, creater_id, creater_name, create_time)
VALUES(99, '部门测试-99', 197, 198, 0, 'yliyun', now());


DELETE from department where left_value <= 197 AND right_value <= 198;
UPDATE department SET right_value = right_value - (198 - 197 + 1) WHERE right_value > 198;
UPDATE department SET left_value = left_value - (198 - 197 + 1) WHERE left_value > 197;