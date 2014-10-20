import os
import _thread

def function(s):
	print("1")
	#os.system(s)
_thread.start_new_thread(function,('npm start',)
# os.system('npm start')

# os.system('call start_web.cmd')
# os.system('call start_mongodb.cmd')
