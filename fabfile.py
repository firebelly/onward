from fabric.api import *
import os

env.hosts = ['onward.firebelly.co']
env.user = 'firebelly'
env.path = '~/Firebelly/onward'
env.remotepath = '/home/firebelly/webapps/onward_dev'
env.git_branch = 'master'
env.warn_only = True
env.remote_protocol = 'http'

def production():
  env.hosts = ['thisisonward.org']
  env.user = 'onward'
  env.remotepath = '/home/onward/webapps/onward_production'
  env.git_branch = 'master'
  env.remote_protocol = 'https'

def devsetup():
  print "Installing composer, yarn...\n"
  local('composer install')
  local('yarn')
  local('cp .env-example .env')
  print "OK DONE! Hello? Are you still awake?\nEdit your .env file with local credentials\nRun `npx gulp watch` to run local gulp to compile & watch assets"

def deploy(composer='y'):
  update()
  if composer == 'y':
    composer_install()
  # scp production assets
  local('yarn build:production')
  run('mkdir -p ' + env.remotepath + '/web/assets/dist')
  put('web/assets/dist', env.remotepath + '/web/assets/')

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))

def composer_install():
  with cd(env.remotepath):
    run('php73 ~/bin/composer.phar install')
