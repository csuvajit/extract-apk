import platform

from system.Logger import Console
from system.Reader import Reader

is_windows = platform.system() == 'Windows'
nul = f' > {"nul" if is_windows else "/dev/null"} 2>&1'
