import os
import zipfile
cmd1 = "ssh -i fmcmerch.pem ec2-user@ec2-34-194-22-220.compute-1.amazonaws.com -t "
sh = ["'./cleanup.sh'","'./active.sh'"]
os.system("npm run build:ssr")
os.system(cmd1+sh[0])
zf = zipfile.ZipFile("fmcmerch.zip", "w")
for dirname, subdirs, files in os.walk("./dist"):
    zf.write(dirname)
    for filename in files:
        zf.write(os.path.join(dirname, filename))
zf.close()

upload ="scp -i fmcmerch.pem fmcmerch.zip ec2-user@ec2-34-194-22-220.compute-1.amazonaws.com:/home/ec2-user/"
os.system(upload)
os.system(cmd1+sh[1])
os.remove("fmcmerch.zip")