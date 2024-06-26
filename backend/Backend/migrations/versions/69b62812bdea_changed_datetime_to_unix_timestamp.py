"""changed datetime to unix timestamp

Revision ID: 69b62812bdea
Revises: 0c769ec426df
Create Date: 2024-06-17 15:41:03.981554

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '69b62812bdea'
down_revision = '0c769ec426df'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.alter_column('timestamp',
               existing_type=sa.DATETIME(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.alter_column('timestamp',
               existing_type=sa.DATETIME(),
               nullable=True)

    # ### end Alembic commands ###
