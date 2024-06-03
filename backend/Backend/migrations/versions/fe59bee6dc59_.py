"""empty message

Revision ID: fe59bee6dc59
Revises: 1918507f62a6
Create Date: 2024-06-03 17:29:21.498122

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe59bee6dc59'
down_revision = '1918507f62a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('admin_notifications',
    sa.Column('admin_id', sa.Integer(), nullable=False),
    sa.Column('notification_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['admin_id'], ['admins.id'], ),
    sa.ForeignKeyConstraint(['notification_id'], ['notifications.id'], ),
    sa.PrimaryKeyConstraint('admin_id', 'notification_id')
    )
    op.create_table('notification_kits',
    sa.Column('notification_id', sa.Integer(), nullable=False),
    sa.Column('kit_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['kit_id'], ['kits.id'], ),
    sa.ForeignKeyConstraint(['notification_id'], ['notifications.id'], ),
    sa.PrimaryKeyConstraint('notification_id', 'kit_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('notification_kits')
    op.drop_table('admin_notifications')
    op.drop_table('notifications')
    # ### end Alembic commands ###